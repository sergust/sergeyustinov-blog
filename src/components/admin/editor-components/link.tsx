import React from "react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import { LinkIcon, UnlinkIcon } from "lucide-react";

export default function EditorLink() {
  const { editor } = useCurrentEditor();

  const setLink = useCallback(() => {
    if (!editor) {
      return null;
    }

    const previousUrl = editor?.getAttributes("link").href as string;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <Button
        onClick={setLink}
        variant="outline"
        size="icon"
        className={editor?.isActive("link") ? "is-active" : ""}
      >
        <LinkIcon className="h-6 w-6" />
      </Button>
      <Button
        onClick={() => editor?.chain().focus().unsetLink().run()}
        variant="outline"
        size="icon"
        disabled={!editor?.isActive("link")}
      >
        <UnlinkIcon className="h-6 w-6" />
      </Button>
    </>
  );
}
