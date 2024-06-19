"use client";
import { useCurrentEditor, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import EditorLink from "./editor-components/link";

function MenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="mb-4 flex gap-2">
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "flex gap-2",
          editor.isActive("bold")
            ? "bg-slate-200 text-black dark:bg-white dark:text-black"
            : "",
        )}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "flex gap-2",
          editor.isActive("italic")
            ? "bg-slate-200 text-black dark:bg-white dark:text-black"
            : "",
        )}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "flex gap-2",
          editor.isActive("underline")
            ? "bg-slate-200 text-black dark:bg-white dark:text-black"
            : "",
        )}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-6 w-6" />
      </Button>

      <EditorLink />
    </div>
  );
}

export default function RichTextEditor({ content }: { content: string }) {
  const extensions = [StarterKit, Underline, Link];

  return (
    <div className="w-full rounded-lg border p-8 drop-shadow-md">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
      >
        <></>
      </EditorProvider>
    </div>
  );
}
