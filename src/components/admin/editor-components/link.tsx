import React from "react";
import { Button } from "@/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function EditorLink() {
  const [link, setLink] = React.useState("");
  const closeRef = React.useRef(null);

  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  function onClick() {
    editor?.chain().focus().toggleLink({ href: link }).run();
    if (closeRef.current) {
      closeRef.current.click();
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "flex gap-2",
              editor.isActive("link")
                ? "bg-slate-200 text-black dark:bg-white dark:text-black"
                : "",
            )}
            onClick={() => onClick()}
          >
            <LinkIcon className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a link</DialogTitle>
            <DialogDescription>Add a link to the text</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                onChange={(event) => setLink(event.target.value)}
              />
            </div>
            <Button type="submit" size="sm" className="px-3" onClick={onClick}>
              <span className="sr-only">Link</span>
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant="destructive">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
