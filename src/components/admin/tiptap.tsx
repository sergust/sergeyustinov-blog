"use client";

import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import CodeBlock from "@tiptap/extension-code-block";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Blockquote,
      BulletList,
      ListItem,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlock,
      Link.configure({
        openOnClick: true,
      }),
      Image,
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <EditorContent
      editor={editor}
      className="border-1 h-screen w-full bg-white p-4 text-xl drop-shadow-lg dark:border-gray-700 dark:bg-gray-800"
    />
  );
};

export default Tiptap;
