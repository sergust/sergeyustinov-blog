"use client";
import "./styles.css";
import { useCurrentEditor, EditorProvider, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import EditorLink from "./link";
import Heading from "@tiptap/extension-heading";
import Headers from "./headers";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import { type Dispatch, type SetStateAction } from "react";

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

export default function RichTextEditor({
  content,
  setContent,
  disabled,
}: {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
}) {
  const extensions = [
    StarterKit,
    Paragraph,
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
    Placeholder.configure({
      // Use a placeholder:
      placeholder: "Write something …",
      // Use different placeholders depending on the node type:
      // placeholder: ({ node }) => {
      //   if (node.type.name === 'heading') {
      //     return 'What’s the title?'
      //   }

      //   return 'Can you add some further context?'
      // },
    }),
  ];

  function handleUpdate(content: Editor) {
    setContent(content.getHTML());
  }

  return (
    <div className="h-full w-full rounded-lg border p-8 ">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        onUpdate={({ editor }) => handleUpdate(editor)}
      >
        <></>
      </EditorProvider>
    </div>
  );
}
