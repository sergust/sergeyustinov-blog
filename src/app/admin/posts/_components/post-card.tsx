import React from "react";
import { type inferRouterOutputs } from "@trpc/server";
import { type postRouter } from "@/server/api/routers/post"; // Ensure this import path is correct
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type CreatePostOutput = inferRouterOutputs<typeof postRouter>["create"];

const PostCard: React.FC<CreatePostOutput> = (post) => {
  console.log(post);
  return (
    <Card className="mb-4 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          {post.name}
        </CardTitle>
        <CardDescription className="text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></p>
        <Link href={`/posts/${post.slug}`}>
          <span className="mt-2 inline-block text-blue-500 hover:underline">
            Read more
          </span>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PostCard;
