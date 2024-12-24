"use client";

import { useParams } from "next/navigation";
import { getPostById } from "@/utils/localStorage";

export default function SinglePostPage() {
  const { id } = useParams(); // Retrieve the dynamic ID from the URL
  const post = getPostById(Number(id)); // Find the post in local storage

  if (!post) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-4xl font-bold mb-6 text-center">Post Not Found</h2>
        <p>The post you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">{post.name}'s Post</h2>
      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-500 mb-4">
          <strong>Social Network:</strong> {post.network}
        </p>
        <p className="text-gray-500 mb-4">
          <strong>Date:</strong> {post.date}
        </p>
        <p className="text-gray-900">{post.text}</p>
      </div>
    </div>
  );
}
