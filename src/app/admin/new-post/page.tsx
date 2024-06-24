"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import RichTextEditor from "@/components/admin/editor-components/editor";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

function NewPostPage() {
  const [content, setContent] = useState("");
  const [post, setPost] = useState({
    title: "",
    slug: "",
    picture: "",
  });

  function updatePost(key: string, value: string) {
    setPost((prev) => ({ ...prev, [key]: value }));
  }

  const createPostMutation = api.post.create.useMutation({
    onSuccess(data) {
      toast.success("Post created!", {
        description: `Post ${data.name} was created successfully`,
        icon: "🚀",
      });
    },
    onError(error) {
      toast.error("Error creating post", {
        description: error.message,
        icon: "❌",
      });
    },
  });

  const { isPending } = createPostMutation;

  async function handleCreatePost() {
    try {
      const response = await createPostMutation.mutateAsync({
        title: post.title,
        slug: post.slug,
        content: content,
      });
      redirect(`/admin/posts/${response.id}`);
    } catch (error) {
      // console.error(error)
    }
  }

  return (
    <section className="container flex min-h-screen flex-col">
      <div className="flex items-center justify-between">
        <h2>Create a post</h2>
        <Button
          className="text-xl"
          onClick={() => handleCreatePost()}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            "✨ Post"
          )}
        </Button>
      </div>
      <div className="my-6">
        <Label htmlFor="post-title">Post title</Label>
        <Input
          id="post-title"
          className="text-xl font-extrabold"
          onChange={(e) => updatePost("title", e.target.value)}
          disabled={isPending}
        />
      </div>
      <div className="my-3">
        <Label htmlFor="post-slug">Slug</Label>
        <Input
          id="post-slug"
          onChange={(e) => updatePost("slug", e.target.value)}
          disabled={isPending}
        />
      </div>
      <div className="my-3 grid w-full items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
      </div>
      <RichTextEditor
        content={content}
        setContent={setContent}
        disabled={isPending}
      />
    </section>
  );
}

export default NewPostPage;
