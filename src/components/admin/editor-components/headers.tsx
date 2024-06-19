import { useCurrentEditor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heading2, Heading3, Heading4, Heading5, Heading6 } from "lucide-react";

export default function Headers() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "flex gap-2",
          editor.isActive("heading", { level: 2 })
            ? "bg-slate-200 text-black dark:bg-white dark:text-black"
            : "",
        )}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "flex gap-2",
          editor.isActive("heading", { level: 3 })
            ? "bg-slate-200 text-black dark:bg-white dark:text-black"
            : "",
        )}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "flex gap-2",
          editor.isActive("heading", { level: 4 })
            ? "bg-slate-200 text-black dark:bg-white dark:text-black"
            : "",
        )}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      >
        <Heading4 className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "flex gap-2",
          editor.isActive("heading", { level: 5 })
            ? "bg-slate-200 text-black dark:bg-white dark:text-black"
            : "",
        )}
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
      >
        <Heading5 className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "flex gap-2",
          editor.isActive("heading", { level: 6 })
            ? "bg-slate-200 text-black dark:bg-white dark:text-black"
            : "",
        )}
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
      >
        <Heading6 className="h-6 w-6" />
      </Button>
    </>
  );
}
