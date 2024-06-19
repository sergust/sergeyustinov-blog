import RichTextEditor from "@/components/admin/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminPage() {
  return (
    <section className="container flex min-h-screen flex-col">
      <div className="flex items-center justify-between">
        <h2>Create a post</h2>
        <Button className="text-xl">✨ Post</Button>
      </div>
      <div className="my-6">
        <Label htmlFor="post-title">Post title</Label>
        <Input id="post-title" className="text-xl font-extrabold" />
      </div>
      <div className="my-6 grid w-full items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
      </div>
      <RichTextEditor content="" />
    </section>
  );
}
