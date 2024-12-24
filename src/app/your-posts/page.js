"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/utils/localStorage";

export default function YourPostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Your Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

