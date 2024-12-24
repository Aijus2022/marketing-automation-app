"use client";

import Link from "next/link";
import { getPosts } from "@/utils/localStorage";

export default function PostList() {
  const posts = getPosts();

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-xl font-bold mb-4">Posts List</h3>
      {posts.length === 0 ? (
        <p>No posts yet. Create one to get started!</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded shadow">
              <p className="font-bold">{post.name}</p>
              <p>{post.text}</p>
              <p className="text-sm text-gray-500">{post.date}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-auto rounded shadow mb-4"
                />
              )}
              <Link
                href={`/your-posts/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                View Full Post
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
