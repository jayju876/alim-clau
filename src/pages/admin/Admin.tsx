import { FormEvent, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import {
  BookOpen,
  FileText,
  Globe,
  Home,
  Image,
  Link as LinkIcon,
  LogOut,
  Menu,
  Search,
  Settings,
  Shield,
  UserPlus,
  Users
} from "lucide-react";
import { cmsApi, cmsAuth, CmsUser } from "@/lib/cmsApi";
import RichTextEditor from "./RichTextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type CmsRecord = Record<string, any>;

const blankSeo = {
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: ""
};

const blankContent = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  authorId: "",
  status: "draft",
  seo: blankSeo,
  headings: { h1: "", h2: "", h3: "" },
  internalLinks: "",
  faqs: "",
  disclaimer: "This content is for educational purposes only and should not be considered legal advice."
};

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: Home, roles: ["admin", "editor"] },
  { id: "site-pages", label: "Website Pages", icon: Globe, roles: ["admin", "editor"] },
  { id: "blogs", label: "Blogs", icon: BookOpen, roles: ["admin", "editor"] },
  { id: "pages", label: "Pages", icon: FileText, roles: ["admin", "editor"] },
  { id: "seo", label: "SEO", icon: Search, roles: ["admin", "editor"] },
  { id: "media", label: "Media", icon: Image, roles: ["admin", "editor"] },
  { id: "authors", label: "Authors", icon: Users, roles: ["admin", "editor"] },
  { id: "users", label: "Users", icon: UserPlus, roles: ["admin"] },
  { id: "settings", label: "Settings", icon: Settings, roles: ["admin"] }
];

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Admin = () => {
  const [user, setUser] = useState<CmsUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    cmsApi.me()
      .then(setUser)
      .catch(() => cmsAuth.clear())
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen grid place-items-center">Loading admin...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;

  const visibleTabs = tabs.filter((tab) => tab.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r bg-background p-4 transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-bold text-legal-blue">CMS Admin</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Badge>{user.role}</Badge>
        </div>
        <nav className="space-y-2">
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${activeTab === tab.id ? "bg-legal-blue text-white" : "hover:bg-muted"}`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
        <Button
          variant="outline"
          className="mt-8 w-full"
          onClick={() => {
            cmsAuth.clear();
            window.location.href = "/admin/login";
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4">
            <Button variant="ghost" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{visibleTabs.find((tab) => tab.id === activeTab)?.label}</h1>
              <p className="text-sm text-muted-foreground">Manage legal SEO content without changing code.</p>
            </div>
            <Button variant="outline" asChild>
              <a href="/" target="_blank" rel="noreferrer">View Site</a>
            </Button>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "site-pages" && <WebsitePagesManager />}
          {activeTab === "blogs" && <ContentManager collection="blogs" title="Blog Posts" />}
          {activeTab === "pages" && <ContentManager collection="pages" title="Pages" />}
          {activeTab === "seo" && <SeoManager />}
          {activeTab === "media" && <MediaManager />}
          {activeTab === "authors" && <AuthorManager />}
          {activeTab === "users" && user.role === "admin" && <UserManager />}
          {activeTab === "settings" && user.role === "admin" && <SettingsManager />}
        </main>
      </div>
    </div>
  );
};

export const AdminLogin = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("ChangeMe123!");
  const [forgotEmail, setForgotEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await cmsApi.login(email, password);
      cmsAuth.setToken(response.token);
      window.location.href = "/admin";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const forgot = async () => {
    if (!forgotEmail) return toast.error("Enter your email first");
    await cmsApi.forgotPassword(forgotEmail);
    toast.success("If the email exists, reset instructions will be sent.");
  };

  return (
    <div className="min-h-screen bg-muted/30 grid place-items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-legal-blue" />
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={login} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
          </form>
          <div className="mt-6 border-t pt-4">
            <Label htmlFor="forgot">Forgot password</Label>
            <div className="mt-2 flex gap-2">
              <Input id="forgot" type="email" placeholder="admin@example.com" value={forgotEmail} onChange={(event) => setForgotEmail(event.target.value)} />
              <Button variant="outline" onClick={forgot}>Send</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Dashboard = () => (
  <div className="grid gap-4 md:grid-cols-4">
    {[
      ["Blogs", "Create, edit, publish and unpublish posts"],
      ["Pages", "Manage static landing pages and SEO content"],
      ["Media", "Upload images and copy image URLs"],
      ["Settings", "Control navigation, footer, and homepage sections"]
    ].map(([title, body]) => (
      <Card key={title}>
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">{body}</CardContent>
      </Card>
    ))}
  </div>
);

const ContentManager = ({ collection, title }: { collection: "blogs" | "pages"; title: string }) => {
  const [items, setItems] = useState<CmsRecord[]>([]);
  const [selected, setSelected] = useState<CmsRecord>({ ...blankContent });

  const load = () => cmsApi.list(collection).then(setItems);
  useEffect(() => { load(); }, [collection]);

  const uploadFeaturedImage = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    form.append("alt", selected.title || file.name.replace(/\.[^.]+$/, ""));
    const media = await cmsApi.uploadMedia(form);
    setSelected({ ...selected, featuredImage: media.url });
    toast.success("Featured image uploaded");
  };

  const save = async () => {
    const payload = { ...selected, slug: selected.slug || slugify(selected.title), lastUpdated: new Date().toISOString().slice(0, 10) };
    if (payload.id) await cmsApi.update(collection, payload.id, payload);
    else await cmsApi.create(collection, payload);
    toast.success(`${title} saved`);
    setSelected({ ...blankContent });
    load();
  };

  const remove = async (id: string) => {
    await cmsApi.remove(collection, id);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[320px,1fr]">
      <ListPanel title={title} items={items} onNew={() => setSelected({ ...blankContent })} onSelect={setSelected} onDelete={remove} />
      <Card>
        <CardHeader><CardTitle>{selected.id ? "Edit" : "Create"} {title.slice(0, -1)}</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <Field label="Title" value={selected.title} onChange={(value) => setSelected({ ...selected, title: value, slug: selected.slug || slugify(value), headings: { ...selected.headings, h1: value } })} />
          <Field label="Slug" value={selected.slug} onChange={(value) => setSelected({ ...selected, slug: slugify(value) })} />
          <FeaturedImageUploader
            value={selected.featuredImage}
            onUpload={uploadFeaturedImage}
            onClear={() => setSelected({ ...selected, featuredImage: "" })}
          />
          <Field label="Excerpt" value={selected.excerpt} textarea onChange={(value) => setSelected({ ...selected, excerpt: value })} />
          <div className="space-y-2">
            <Label>Rich Text Content</Label>
            <RichTextEditor value={selected.content} onChange={(value) => setSelected({ ...selected, content: value })} />
          </div>
          <HeadingFields record={selected} setRecord={setSelected} />
          <SeoFields record={selected} setRecord={setSelected} />
          <Field label="Internal Links (one per line)" value={selected.internalLinks} textarea onChange={(value) => setSelected({ ...selected, internalLinks: value })} />
          <Field label="FAQ Sections (question | answer, one per line)" value={selected.faqs} textarea onChange={(value) => setSelected({ ...selected, faqs: value })} />
          <Field label="Disclaimer Section" value={selected.disclaimer} textarea onChange={(value) => setSelected({ ...selected, disclaimer: value })} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={selected.status} onValueChange={(status) => setSelected({ ...selected, status })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Field label="Author ID" value={selected.authorId} onChange={(value) => setSelected({ ...selected, authorId: value })} />
          </div>
          <Button onClick={save}>Save {title.slice(0, -1)}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

const WebsitePagesManager = () => {
  const [items, setItems] = useState<CmsRecord[]>([]);
  const [selected, setSelected] = useState<CmsRecord | null>(null);
  const [query, setQuery] = useState("");

  const load = () => cmsApi.sitePages().then((pages) => {
    setItems(pages);
    setSelected((current) => current ? pages.find((page: CmsRecord) => page.id === current.id) || current : pages[0] || null);
  });

  useEffect(() => { load(); }, []);

  const filtered = items.filter((item) =>
    [item.title, item.pagePath, item.type, item.slug].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  const updateSelected = (key: string, value: string) => {
    if (!selected) return;
    setSelected({ ...selected, [key]: key === "slug" ? slugify(value) : value });
  };

  const save = async () => {
    if (!selected) return;
    const saved = await cmsApi.updateSitePage(selected.id, selected);
    toast.success("Page SEO settings saved");
    setSelected({ ...selected, ...saved });
    load();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[380px,1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>All Website Pages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Search pages, states, slugs..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <div className="max-h-[70vh] space-y-2 overflow-auto pr-1">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={`w-full rounded-lg border p-3 text-left transition-colors ${selected?.id === item.id ? "border-legal-blue bg-legal-blue/5" : "bg-background hover:border-legal-blue"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.pagePath}</p>
                  </div>
                  <Badge variant="secondary">{item.type}</Badge>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selected && (
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2">
              Manage Page SEO
              <Badge>{selected.type}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Live path:</strong> {selected.pagePath}</p>
              <p className="mt-1">For built-in pages and state calculators, slug changes are stored as SEO/canonical settings. CMS-created blogs and pages update their live slug too.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Page Title" value={selected.title} onChange={(value: string) => updateSelected("title", value)} />
              <Field label="URL Slug" value={selected.slug} onChange={(value: string) => updateSelected("slug", value)} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Meta Title" value={selected.metaTitle} onChange={(value: string) => updateSelected("metaTitle", value)} />
              <Field label="Meta Keywords" value={selected.metaKeywords} onChange={(value: string) => updateSelected("metaKeywords", value)} />
            </div>

            <Field label="Meta Description" value={selected.metaDescription} textarea onChange={(value: string) => updateSelected("metaDescription", value)} />
            <Field label="Canonical URL" value={selected.canonicalUrl} onChange={(value: string) => updateSelected("canonicalUrl", value)} />

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="OG Title" value={selected.ogTitle} onChange={(value: string) => updateSelected("ogTitle", value)} />
              <Field label="OG Description" value={selected.ogDescription} textarea onChange={(value: string) => updateSelected("ogDescription", value)} />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={save}>Save Page SEO</Button>
              <Button variant="outline" asChild>
                <a href={selected.pagePath} target="_blank" rel="noreferrer">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Open Page
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const ListPanel = ({ title, items, onNew, onSelect, onDelete }: any) => (
  <Card className="h-fit">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>{title}</CardTitle>
      <Button size="sm" onClick={onNew}>New</Button>
    </CardHeader>
    <CardContent className="space-y-2">
      {items.map((item: CmsRecord) => (
        <div key={item.id} className="rounded-lg border p-3">
          <button className="block text-left font-medium hover:text-legal-blue" onClick={() => onSelect(item)}>{item.title || item.name || item.pagePath}</button>
          <div className="mt-2 flex items-center justify-between">
            <Badge variant={item.status === "published" ? "default" : "secondary"}>{item.status || "active"}</Badge>
            <Button variant="ghost" size="sm" onClick={() => onDelete(item.id)}>Delete</Button>
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-sm text-muted-foreground">No records yet.</p>}
    </CardContent>
  </Card>
);

const Field = ({ label, value, onChange, textarea = false }: any) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {textarea ? (
      <Textarea value={value || ""} onChange={(event) => onChange(event.target.value)} className="min-h-24" />
    ) : (
      <Input value={value || ""} onChange={(event) => onChange(event.target.value)} />
    )}
  </div>
);

const FeaturedImageUploader = ({ value, onUpload, onClear }: { value?: string; onUpload: (file: File) => void; onClear: () => void }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Featured Image</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {value ? (
        <div className="space-y-3">
          <img src={value} alt="Featured preview" className="aspect-video w-full max-w-lg rounded-lg border object-cover" />
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => navigator.clipboard.writeText(value)}>Copy URL</Button>
            <Button type="button" variant="ghost" onClick={onClear}>Remove</Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Upload a featured image directly from your computer.</p>
      )}
      <Input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onUpload(file);
          event.target.value = "";
        }}
      />
    </CardContent>
  </Card>
);

const SeoFields = ({ record, setRecord }: any) => {
  const seo = record.seo || blankSeo;
  const update = (key: string, value: string) => setRecord({ ...record, seo: { ...seo, [key]: value } });
  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">SEO Settings</CardTitle></CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {Object.keys(blankSeo).map((key) => (
          <Field key={key} label={key.replace(/([A-Z])/g, " $1")} value={seo[key]} onChange={(value: string) => update(key, value)} textarea={["metaDescription", "ogDescription"].includes(key)} />
        ))}
      </CardContent>
    </Card>
  );
};

const HeadingFields = ({ record, setRecord }: any) => {
  const headings = record.headings || {};
  const update = (key: string, value: string) => setRecord({ ...record, headings: { ...headings, [key]: value } });
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {["h1", "h2", "h3"].map((key) => <Field key={key} label={key.toUpperCase()} value={headings[key]} onChange={(value: string) => update(key, value)} />)}
    </div>
  );
};

const SeoManager = () => {
  const [items, setItems] = useState<CmsRecord[]>([]);
  const [record, setRecord] = useState<CmsRecord>({ pagePath: "/", ...blankSeo });
  const load = () => cmsApi.list("seo").then(setItems);
  useEffect(() => { load(); }, []);
  const save = async () => {
    if (record.id) await cmsApi.update("seo", record.id, record);
    else await cmsApi.create("seo", record);
    toast.success("SEO settings saved");
    setRecord({ pagePath: "/", ...blankSeo });
    load();
  };
  return (
    <div className="grid gap-6 xl:grid-cols-[320px,1fr]">
      <ListPanel title="SEO Overrides" items={items} onNew={() => setRecord({ pagePath: "/", ...blankSeo })} onSelect={setRecord} onDelete={async (id: string) => { await cmsApi.remove("seo", id); load(); }} />
      <Card><CardHeader><CardTitle>Page SEO</CardTitle></CardHeader><CardContent className="space-y-4">
        <Field label="Page Path" value={record.pagePath} onChange={(value: string) => setRecord({ ...record, pagePath: value })} />
        {Object.keys(blankSeo).map((key) => <Field key={key} label={key.replace(/([A-Z])/g, " $1")} value={record[key]} onChange={(value: string) => setRecord({ ...record, [key]: value })} textarea={key.includes("Description")} />)}
        <Button onClick={save}>Save SEO</Button>
      </CardContent></Card>
    </div>
  );
};

const MediaManager = () => {
  const [items, setItems] = useState<CmsRecord[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const load = () => cmsApi.list("media").then(setItems);
  useEffect(() => { load(); }, []);
  const upload = async () => {
    if (!file) return toast.error("Choose an image");
    const form = new FormData();
    form.append("file", file);
    form.append("alt", alt);
    await cmsApi.uploadMedia(form);
    toast.success("Image uploaded");
    setFile(null);
    setAlt("");
    load();
  };
  return (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>Upload Image</CardTitle></CardHeader><CardContent className="grid gap-4 md:grid-cols-[1fr,1fr,auto]">
        <Input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} />
        <Input placeholder="Alt text" value={alt} onChange={(event) => setAlt(event.target.value)} />
        <Button onClick={upload}>Upload</Button>
      </CardContent></Card>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id}><CardContent className="p-4 space-y-3">
            <img src={item.url} alt={item.alt} className="h-40 w-full rounded object-cover" loading="lazy" />
            <p className="text-sm font-medium">{item.alt || item.originalName}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(item.url)}>Copy URL</Button>
              <Button size="sm" variant="ghost" onClick={async () => { await cmsApi.remove("media", item.id); load(); }}>Delete</Button>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
};

const AuthorManager = () => {
  const [items, setItems] = useState<CmsRecord[]>([]);
  const [record, setRecord] = useState<CmsRecord>({ name: "", bio: "", image: "", linkedin: "" });
  const load = () => cmsApi.list("authors").then(setItems);
  useEffect(() => { load(); }, []);
  const save = async () => {
    if (record.id) await cmsApi.update("authors", record.id, record);
    else await cmsApi.create("authors", record);
    toast.success("Author saved");
    setRecord({ name: "", bio: "", image: "", linkedin: "" });
    load();
  };
  return (
    <div className="grid gap-6 xl:grid-cols-[320px,1fr]">
      <ListPanel title="Authors" items={items} onNew={() => setRecord({ name: "", bio: "", image: "", linkedin: "" })} onSelect={setRecord} onDelete={async (id: string) => { await cmsApi.remove("authors", id); load(); }} />
      <Card><CardHeader><CardTitle>Author</CardTitle></CardHeader><CardContent className="space-y-4">
        <Field label="Name" value={record.name} onChange={(value: string) => setRecord({ ...record, name: value })} />
        <Field label="Bio" value={record.bio} textarea onChange={(value: string) => setRecord({ ...record, bio: value })} />
        <Field label="Image URL" value={record.image} onChange={(value: string) => setRecord({ ...record, image: value })} />
        <Field label="LinkedIn URL" value={record.linkedin} onChange={(value: string) => setRecord({ ...record, linkedin: value })} />
        <Button onClick={save}>Save Author</Button>
      </CardContent></Card>
    </div>
  );
};

const UserManager = () => {
  const [items, setItems] = useState<CmsUser[]>([]);
  const [record, setRecord] = useState({ email: "", password: "", role: "editor" });
  const load = () => cmsApi.users().then(setItems);
  useEffect(() => { load(); }, []);
  const save = async () => {
    await cmsApi.createUser(record);
    toast.success("User added");
    setRecord({ email: "", password: "", role: "editor" });
    load();
  };
  return (
    <div className="grid gap-6 xl:grid-cols-[320px,1fr]">
      <Card><CardHeader><CardTitle>Admin Users</CardTitle></CardHeader><CardContent className="space-y-2">
        {items.map((item) => <div key={item.id} className="flex items-center justify-between rounded border p-3"><span>{item.email}</span><Badge>{item.role}</Badge></div>)}
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Add User</CardTitle></CardHeader><CardContent className="space-y-4">
        <Field label="Email" value={record.email} onChange={(value: string) => setRecord({ ...record, email: value })} />
        <Field label="Password" value={record.password} onChange={(value: string) => setRecord({ ...record, password: value })} />
        <Label>Role</Label>
        <Select value={record.role} onValueChange={(role) => setRecord({ ...record, role })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="admin">Admin</SelectItem><SelectItem value="editor">Editor</SelectItem></SelectContent>
        </Select>
        <Button onClick={save}>Add User</Button>
      </CardContent></Card>
    </div>
  );
};

const SettingsManager = () => {
  const [settings, setSettings] = useState<any>({ navigation: [], footer: "", homepageSections: [] });
  const navigationText = useMemo(() => (settings.navigation || []).map((item: any) => `${item.label}|${item.url}|${item.visible}`).join("\n"), [settings.navigation]);
  const homepageText = useMemo(() => (settings.homepageSections || []).map((item: any) => `${item.heading}|${item.body}|${item.published}`).join("\n"), [settings.homepageSections]);
  useEffect(() => { cmsApi.settings().then(setSettings); }, []);
  const save = async () => {
    await cmsApi.updateSettings(settings);
    toast.success("Settings saved");
  };
  return (
    <Card><CardHeader><CardTitle>Site Settings</CardTitle></CardHeader><CardContent className="space-y-4">
      <Field label="Navigation Menu (label|url|visible)" value={navigationText} textarea onChange={(value: string) => setSettings({ ...settings, navigation: value.split("\n").filter(Boolean).map((line) => {
        const [label, url, visible = "true"] = line.split("|");
        return { label, url, visible: visible !== "false" };
      }) })} />
      <Field label="Footer Content" value={settings.footer} textarea onChange={(value: string) => setSettings({ ...settings, footer: value })} />
      <Field label="Homepage Sections (heading|body|published)" value={homepageText} textarea onChange={(value: string) => setSettings({ ...settings, homepageSections: value.split("\n").filter(Boolean).map((line) => {
        const [heading, body, published = "true"] = line.split("|");
        return { heading, body, published: published !== "false" };
      }) })} />
      <Button onClick={save}>Save Settings</Button>
    </CardContent></Card>
  );
};

export default Admin;
