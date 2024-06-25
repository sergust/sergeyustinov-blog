"use client";

import React from "react";
import { type PartialBlock, type BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import "@blocknote/mantine/style.css";
import "@blocknote/react/style.css";
import "@blocknote/core/fonts/inter.css";
import { uploadFiles } from "@/utils/uploadthing";
import { toast } from "sonner";

interface EditorProps {
  onChange: (document: unknown) => void;
  initialContent?: string;
  editable?: boolean;
}
const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable,
}) => {
  const { systemTheme } = useTheme();

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: async (file: File) => {
      try {
        const [res] = await uploadFiles("imageUploader", { files: [file] });
        return res!.url;
      } catch (e) {
        toast.error("Failed to upload image");
        return "";
      }
    },
  });

  return (
    <div className="my-4">
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={() => {
          onChange(editor.document);
        }}
        theme={systemTheme}
      />
    </div>
  );
};

export default Editor;
