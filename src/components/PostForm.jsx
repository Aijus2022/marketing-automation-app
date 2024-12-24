"use client";

import { useState } from "react";
import { savePost } from "@/utils/localStorage";

export default function PostForm() {
  const [content, setContent] = useState({
    text: "",
    network: "",
    name: "",
    image: null, // Add image field
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setContent((prevContent) => ({
          ...prevContent,
          image: reader.result, // Save base64 encoded image
        }));
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      ...content,
      id: Date.now(),
      date: new Date().toLocaleString(),
    };

    // Save the post to local storage
    savePost(newPost);

    // Trigger a notification
    const notificationEvent = new CustomEvent("new-post", { detail: newPost });
    window.dispatchEvent(notificationEvent);

    alert("Post saved successfully!");
    setContent({ text: "", network: "", name: "", image: null }); // Clear the form
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-4">Create a Post</h3>
      <input
        type="text"
        placeholder="Name"
        value={content.name}
        onChange={(e) => setContent({ ...content, name: e.target.value })}
        className="w-full border p-2 rounded mb-4"
      />
      <input
        type="text"
        placeholder="Social Network (e.g., Twitter)"
        value={content.network}
        onChange={(e) => setContent({ ...content, network: e.target.value })}
        className="w-full border p-2 rounded mb-4"
      />
      <textarea
        placeholder="Write your post..."
        value={content.text}
        onChange={(e) => setContent({ ...content, text: e.target.value })}
        className="w-full border p-2 rounded mb-4"
      ></textarea>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border p-2 rounded mb-4"
      />
      {content.image && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Image Preview:</p>
          <img
            src={content.image}
            alt="Preview"
            className="w-full h-auto rounded shadow"
          />
        </div>
      )}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
