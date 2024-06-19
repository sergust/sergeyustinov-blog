"use client";
import { useCurrentEditor, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import EditorLink from "./editor-components/link";
import Heading from "@tiptap/extension-heading";
import Headers from "./editor-components/headers";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";

function MenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="mb-4 flex flex-wrap justify-start gap-2">
      <Headers />
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

      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant="outline"
        size="icon"
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <StrikethroughIcon className="h-6 w-6" />
      </Button>

      <EditorLink />

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "flex gap-2",
          editor.isActive("code")
            ? "bg-slate-200 text-black dark:bg-white dark:text-black"
            : "",
        )}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <CodeIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}

export default function RichTextEditor({ content }: { content: string }) {
  const extensions = [
    StarterKit,
    Underline,
    Link.configure({
      HTMLAttributes: {
        class: "text-blue-500 underline cursor-pointer",
      },
    }),
    Heading.configure({
      levels: [2, 3, 4, 5, 6],
    }),
    Strike,
    Code,
  ];

  return (
    <div className="w-full rounded-lg border p-8 ">
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
