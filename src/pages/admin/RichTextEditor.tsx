import { useEffect, useRef } from "react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo,
  Table,
  Underline,
  Undo
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cmsApi } from "@/lib/cmsApi";
import { toast } from "sonner";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const buttonClass = "h-9 w-9 p-0";

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "<p></p>";
    }
  }, [value]);

  const sync = () => {
    onChange(editorRef.current?.innerHTML || "");
  };

  const command = (name: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(name, false, commandValue);
    sync();
  };

  const block = (tag: string) => command("formatBlock", tag);

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (!url) return;
    command("createLink", url);
  };

  const addTable = () => {
    editorRef.current?.focus();
    const table = `
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <thead>
          <tr><th style="border:1px solid #ddd;padding:8px">Header 1</th><th style="border:1px solid #ddd;padding:8px">Header 2</th></tr>
        </thead>
        <tbody>
          <tr><td style="border:1px solid #ddd;padding:8px">Cell 1</td><td style="border:1px solid #ddd;padding:8px">Cell 2</td></tr>
        </tbody>
      </table>
    `;
    document.execCommand("insertHTML", false, table);
    sync();
  };

  const uploadInlineImage = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    form.append("alt", file.name.replace(/\.[^.]+$/, ""));
    const media = await cmsApi.uploadMedia(form);
    document.execCommand("insertHTML", false, `<img src="${media.url}" alt="${media.alt || file.name}" style="max-width:100%;height:auto;border-radius:8px;margin:16px 0" />`);
    sync();
    toast.success("Image inserted");
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) uploadInlineImage(file);
          event.target.value = "";
        }}
      />
      <div className="flex flex-wrap gap-1 rounded-t-lg border bg-muted/40 p-2">
        <Button type="button" variant="ghost" className={buttonClass} title="Paragraph" onClick={() => block("p")}><Pilcrow className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" className={buttonClass} title="H1" onClick={() => block("h1")}><Heading1 className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" className={buttonClass} title="H2" onClick={() => block("h2")}><Heading2 className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" className={buttonClass} title="H3" onClick={() => block("h3")}><Heading3 className="h-4 w-4" /></Button>
        <span className="mx-1 h-9 border-l" />
        <Button type="button" variant="ghost" className={buttonClass} title="Bold" onClick={() => command("bold")}><Bold className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" className={buttonClass} title="Italic" onClick={() => command("italic")}><Italic className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" className={buttonClass} title="Underline" onClick={() => command("underline")}><Underline className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" className={buttonClass} title="Quote" onClick={() => block("blockquote")}><Quote className="h-4 w-4" /></Button>
        <span className="mx-1 h-9 border-l" />
        <Button type="button" variant="ghost" className={buttonClass} title="Bulleted list" onClick={() => command("insertUnorderedList")}><List className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" className={buttonClass} title="Numbered list" onClick={() => command("insertOrderedList")}><ListOrdered className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" className={buttonClass} title="Link" onClick={addLink}><Link className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" className={buttonClass} title="Table" onClick={addTable}><Table className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" className={buttonClass} title="Upload image" onClick={() => fileRef.current?.click()}><Image className="h-4 w-4" /></Button>
        <span className="mx-1 h-9 border-l" />
        <Button type="button" variant="ghost" className={buttonClass} title="Undo" onClick={() => command("undo")}><Undo className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" className={buttonClass} title="Redo" onClick={() => command("redo")}><Redo className="h-4 w-4" /></Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={sync}
        onBlur={sync}
        className="prose prose-slate min-h-80 max-w-none rounded-b-lg border border-t-0 bg-background p-5 focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
};

export default RichTextEditor;
