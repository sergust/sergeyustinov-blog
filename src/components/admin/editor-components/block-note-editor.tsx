"use client";

import React, { ChangeEvent } from "react";
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
  onDocumentChange: (document: unknown) => void;
  onHTMLChange: (html: string) => void;
  initialContent?: string;
  editable?: boolean;
}
const Editor: React.FC<EditorProps> = ({
  onDocumentChange,
  onHTMLChange,
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

  const onChange = async () => {
    onDocumentChange(editor.document);
    const html = await editor.blocksToHTMLLossy(editor.document);
    onHTMLChange(html);
  };

  return (
    <div className="my-4">
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={onChange}
        theme={systemTheme}
      />
    </div>
  );
};

export default Editor;
