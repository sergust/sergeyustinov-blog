import { api } from "@/trpc/server";
import React from "react";
import PostCard from "./_components/post-card";

async function AdminPosts() {
  const latestPreviews = await api.post.getLatestPreviews();
  return (
    <section className="container mx-auto my-8">
      <h2 className="mb-4 text-left text-2xl font-bold">All posts</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {latestPreviews.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}

export default AdminPosts;
