"use client";

import { createContext, useContext, useState } from "react";

// Create Context
const PostsContext = createContext();

// Custom Hook to Use Context
export const usePosts = () => useContext(PostsContext);

// Provider Component
export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
}
