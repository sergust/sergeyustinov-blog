"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { type Block } from "@blocknote/core";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

function NewPostPage() {
  const Editor = useMemo(
    () =>
      dynamic(
        () => import("@/components/admin/editor-components/block-note-editor"),
        { ssr: false },
      ),
    [],
  );
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [htmlPost, setHtmlPost] = useState<string>("");

  const [post, setPost] = useState({
    title: "",
    slug: "",
  });

  const [pictureUrl, setPictureUrl] = useState<string | undefined>(undefined);

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

  const deleteImageMutation = api.uploadThing.deleteImage.useMutation({
    onSuccess() {
      toast.success("Image deleted!", {
        description: `Image was deleted successfully`,
        icon: "🚀",
      });
    },
    onError(error) {
      toast.error("Error deleting image", {
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
        content: htmlPost,
        pictureUrl: pictureUrl || "",
      });
      redirect(`/admin/posts/${response.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteImage() {
    if (!pictureUrl) return;
    try {
      await deleteImageMutation.mutateAsync(pictureUrl);
      setPictureUrl(undefined);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="container flex flex-col">
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
      <div className="my-3 flex flex-col gap-4 rounded-xl border-2 border-dashed border-blue-600 p-4">
        {pictureUrl ? (
          <Button variant="destructive" onClick={() => handleDeleteImage()}>
            {deleteImageMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
              </>
            ) : (
              "🗑️ Delete image"
            )}
          </Button>
        ) : (
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setPictureUrl(res[0]!.url);
              toast.success("Image uploaded", {
                icon: "🚀",
                description: "Image uploaded successfully",
              });
            }}
            onUploadError={(error: Error) => {
              toast.error("Error uploading image", {
                description: error.message,
                icon: "❌",
              });
            }}
            className="my-2 justify-self-start"
          />
        )}

        {pictureUrl && (
          <Image
            src={pictureUrl}
            width={2048}
            height={1024}
            alt="post picture"
            className="w-full"
          />
        )}
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

      {/* <RichTextEditor
        content={content}
        setContent={setContent}
        disabled={isPending}
      /> */}

      <div className="my-4 h-full">
        <Label htmlFor="post-block" className="mb-2">
          Post content
        </Label>
        <div className="h-full rounded border" id="post-block">
          <Editor onDocumentChange={setBlocks} onHTMLChange={setHtmlPost} />
        </div>
      </div>
    </section>
  );
}

export default NewPostPage;
