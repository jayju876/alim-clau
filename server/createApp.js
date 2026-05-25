import "dotenv/config";
import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuid } from "uuid";
import { ensureDb, publicUser, readDb, syncAdminFromEnv, touch, uploadsDir, writeDb } from "./db.js";
import { requireAdmin, requireAuth, requireEditor, signUser } from "./auth.js";
import { normalizeEmail } from "./normalizeEmail.js";

export async function createApp({ serveStatic = false } = {}) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const clientOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:8080")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  await ensureDb();
  await syncAdminFromEnv();

  const app = express();

  app.use(
  cors({
    origin(origin, callback) {
      if (!origin || clientOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuid()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, file.mimetype.startsWith("image/"));
  }
});

const slugify = (value = "") =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const stateNames = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const staticPages = [
  { id: "static:home", type: "Static Page", title: "Homepage", pagePath: "/", slug: "" },
  { id: "static:about", type: "Static Page", title: "About Us", pagePath: "/about", slug: "about" },
  { id: "static:contact", type: "Static Page", title: "Contact Us", pagePath: "/contact", slug: "contact" },
  { id: "static:disclaimer", type: "Static Page", title: "Disclaimer", pagePath: "/disclaimer", slug: "disclaimer" },
  { id: "trust:privacy-policy", type: "Trust Page", title: "Privacy Policy", pagePath: "/privacy-policy", slug: "privacy-policy" },
  { id: "trust:terms-and-conditions", type: "Trust Page", title: "Terms and Conditions", pagePath: "/terms-and-conditions", slug: "terms-and-conditions" },
  { id: "trust:editorial-policy", type: "Trust Page", title: "Editorial Policy", pagePath: "/editorial-policy", slug: "editorial-policy" },
  { id: "trust:legal-disclaimer", type: "Trust Page", title: "Legal Disclaimer", pagePath: "/legal-disclaimer", slug: "legal-disclaimer" },
  { id: "trust:meet-our-experts", type: "Trust Page", title: "Meet Our Experts", pagePath: "/meet-our-experts", slug: "meet-our-experts" },
  { id: "trust:how-we-calculate-alimony", type: "Trust Page", title: "How We Calculate Alimony", pagePath: "/how-we-calculate-alimony", slug: "how-we-calculate-alimony" },
  { id: "trust:data-sources", type: "Trust Page", title: "Data Sources", pagePath: "/data-sources", slug: "data-sources" },
  { id: "trust:state-law-references", type: "Trust Page", title: "State Law References", pagePath: "/state-law-references", slug: "state-law-references" },
  { id: "trust:blog", type: "Blog Index", title: "Blog", pagePath: "/blog", slug: "blog" }
];

const defaultSitePages = () => [
  ...staticPages,
  ...stateNames.map((name) => {
    const slug = `${slugify(name)}-alimony-calculator`;
    return {
      id: `state:${slug}`,
      type: "State Calculator",
      title: `${name} Alimony Calculator`,
      pagePath: `/${slug}`,
      slug
    };
  })
];

const findSeoRecord = (db, page) =>
  db.seo.find((item) => item.pageId === page.id || item.pagePath === page.pagePath);

const mergeSeo = (db, page) => {
  const override = findSeoRecord(db, page) || {};
  return {
    ...page,
    ...override,
    id: page.id,
    seoId: override.id,
    pagePath: override.pagePath || page.pagePath,
    slug: override.slug ?? page.slug,
    metaTitle: override.metaTitle || "",
    metaDescription: override.metaDescription || "",
    metaKeywords: override.metaKeywords || "",
    canonicalUrl: override.canonicalUrl || "",
    ogTitle: override.ogTitle || "",
    ogDescription: override.ogDescription || ""
  };
};

const collectionRoute = (name, adminOnly = false) => {
  const guards = [requireAuth, adminOnly ? requireAdmin : requireEditor];

  app.get(`/api/${name}`, requireAuth, async (_req, res) => {
    const db = await readDb();
    res.json(db[name] || []);
  });

  app.post(`/api/${name}`, ...guards, async (req, res) => {
    const db = await readDb();
    const record = touch({
      ...req.body,
      slug: req.body.slug || slugify(req.body.title || req.body.name || ""),
      status: req.body.status || "draft"
    }, true);
    db[name].push(record);
    await writeDb(db);
    res.status(201).json(record);
  });

  app.put(`/api/${name}/:id`, ...guards, async (req, res) => {
    const db = await readDb();
    const index = db[name].findIndex((item) => item.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Record not found" });
    db[name][index] = touch({
      ...db[name][index],
      ...req.body,
      slug: req.body.slug || db[name][index].slug || slugify(req.body.title || req.body.name || "")
    });
    await writeDb(db);
    res.json(db[name][index]);
  });

  app.delete(`/api/${name}/:id`, ...guards, async (req, res) => {
    const db = await readDb();
    db[name] = db[name].filter((item) => item.id !== req.params.id);
    await writeDb(db);
    res.status(204).end();
  });
};

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/site-pages", requireAuth, async (_req, res) => {
  const db = await readDb();
  const cmsPages = db.pages.map((page) => ({
    id: `cms-page:${page.id}`,
    type: "CMS Page",
    title: page.title || "Untitled Page",
    pagePath: `/p/${page.slug}`,
    slug: page.slug,
    sourceId: page.id,
    status: page.status
  }));
  const blogPages = db.blogs.map((blog) => ({
    id: `blog:${blog.id}`,
    type: "Blog Post",
    title: blog.title || "Untitled Blog",
    pagePath: `/blog/${blog.slug}`,
    slug: blog.slug,
    sourceId: blog.id,
    status: blog.status
  }));
  res.json([...defaultSitePages(), ...cmsPages, ...blogPages].map((page) => mergeSeo(db, page)));
});

app.put("/api/site-pages/:id", requireAuth, requireEditor, async (req, res) => {
  const db = await readDb();
  const decodedId = decodeURIComponent(req.params.id);
  const payload = {
    pageId: decodedId,
    type: req.body.type,
    title: req.body.title,
    pagePath: req.body.pagePath,
    slug: slugify(req.body.slug || ""),
    metaTitle: req.body.metaTitle || "",
    metaDescription: req.body.metaDescription || "",
    metaKeywords: req.body.metaKeywords || "",
    canonicalUrl: req.body.canonicalUrl || "",
    ogTitle: req.body.ogTitle || "",
    ogDescription: req.body.ogDescription || ""
  };

  if (decodedId.startsWith("cms-page:")) {
    const sourceId = decodedId.replace("cms-page:", "");
    const page = db.pages.find((item) => item.id === sourceId);
    if (page) {
      page.slug = payload.slug || page.slug;
      page.seo = {
        ...(page.seo || {}),
        metaTitle: payload.metaTitle,
        metaDescription: payload.metaDescription,
        metaKeywords: payload.metaKeywords,
        canonicalUrl: payload.canonicalUrl,
        ogTitle: payload.ogTitle,
        ogDescription: payload.ogDescription
      };
      page.updatedAt = new Date().toISOString();
      payload.pagePath = `/p/${page.slug}`;
    }
  }

  if (decodedId.startsWith("blog:")) {
    const sourceId = decodedId.replace("blog:", "");
    const blog = db.blogs.find((item) => item.id === sourceId);
    if (blog) {
      blog.slug = payload.slug || blog.slug;
      blog.seo = {
        ...(blog.seo || {}),
        metaTitle: payload.metaTitle,
        metaDescription: payload.metaDescription,
        metaKeywords: payload.metaKeywords,
        canonicalUrl: payload.canonicalUrl,
        ogTitle: payload.ogTitle,
        ogDescription: payload.ogDescription
      };
      blog.updatedAt = new Date().toISOString();
      payload.pagePath = `/blog/${blog.slug}`;
    }
  }

  const index = db.seo.findIndex((item) => item.pageId === decodedId);
  const record = touch(index >= 0 ? { ...db.seo[index], ...payload } : payload, index < 0);
  if (index >= 0) db.seo[index] = record;
  else db.seo.push(record);
  await writeDb(db);
  res.json(record);
});

app.get("/api/public/blogs/:slug", async (req, res) => {
  const db = await readDb();
  const blog = db.blogs.find((item) => item.slug === req.params.slug && item.status === "published");
  if (!blog) return res.status(404).json({ error: "Blog not found" });
  const author = db.authors.find((item) => item.id === blog.authorId) || db.authors[0] || null;
  res.json({ ...blog, author });
});

app.get("/api/public/pages/:slug", async (req, res) => {
  const db = await readDb();
  const page = db.pages.find((item) => item.slug === req.params.slug && item.status === "published");
  if (!page) return res.status(404).json({ error: "Page not found" });
  res.json(page);
});

app.get("/api/public/seo", async (req, res) => {
  const db = await readDb();
  const pagePath = String(req.query.path || "/");
  const record = db.seo.find((item) => item.pagePath === pagePath);
  res.json(record || {});
});

app.post("/api/auth/login", async (req, res) => {
  const db = await readDb();
  const email = normalizeEmail(req.body.email);
  const user = db.users.find((item) => item.email.toLowerCase() === email);
  if (!user || !(await bcrypt.compare(req.body.password || "", user.passwordHash))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  res.json({ token: signUser(user), user: publicUser(user) });
});

app.get("/api/auth/me", requireAuth, (req, res) => res.json(req.user));

app.post("/api/auth/forgot-password", async (req, res) => {
  const db = await readDb();
  const user = db.users.find((item) => item.email.toLowerCase() === String(req.body.email || "").toLowerCase());
  if (user) {
    user.resetToken = uuid();
    user.resetExpiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await writeDb(db);
    console.log(`Password reset token for ${user.email}: ${user.resetToken}`);
  }
  res.json({ message: "If that email exists, a password reset link will be sent." });
});

app.post("/api/users", requireAuth, requireAdmin, async (req, res) => {
  const db = await readDb();
  if (db.users.some((item) => item.email.toLowerCase() === req.body.email.toLowerCase())) {
    return res.status(409).json({ error: "Email already exists" });
  }
  const user = touch({
    email: req.body.email,
    role: req.body.role === "editor" ? "editor" : "admin",
    passwordHash: await bcrypt.hash(req.body.password || "ChangeMe123!", 12)
  }, true);
  db.users.push(user);
  await writeDb(db);
  res.status(201).json(publicUser(user));
});

app.get("/api/users", requireAuth, requireAdmin, async (_req, res) => {
  const db = await readDb();
  res.json(db.users.map(publicUser));
});

app.delete("/api/users/:id", requireAuth, requireAdmin, async (req, res) => {
  const db = await readDb();
  db.users = db.users.filter((item) => item.id !== req.params.id);
  await writeDb(db);
  res.status(204).end();
});

collectionRoute("blogs");
collectionRoute("pages");
collectionRoute("authors");
collectionRoute("seo");

app.get("/api/media", requireAuth, async (_req, res) => {
  const db = await readDb();
  res.json(db.media);
});

app.post("/api/media", requireAuth, requireEditor, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Image file is required" });
  const db = await readDb();
  const media = touch({
    filename: req.file.filename,
    originalName: req.file.originalname,
    url: `/uploads/${req.file.filename}`,
    alt: req.body.alt || "",
    mimeType: req.file.mimetype,
    size: req.file.size
  }, true);
  db.media.push(media);
  await writeDb(db);
  res.status(201).json(media);
});

app.delete("/api/media/:id", requireAuth, requireEditor, async (req, res) => {
  const db = await readDb();
  db.media = db.media.filter((item) => item.id !== req.params.id);
  await writeDb(db);
  res.status(204).end();
});

app.get("/api/settings", requireAuth, async (_req, res) => {
  const db = await readDb();
  res.json(db.settings);
});

app.put("/api/settings", requireAuth, requireAdmin, async (req, res) => {
  const db = await readDb();
  db.settings = { ...db.settings, ...req.body };
  await writeDb(db);
  res.json(db.settings);
});

  if (serveStatic) {
    app.use(express.static(path.join(__dirname, "..", "dist")));
    app.use((_req, res) => {
      res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
    });
  }

  return app;
}
