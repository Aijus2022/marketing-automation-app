"use client";

import { useState } from "react";
import PostForm from "@/components/PostForm";
import Notifications from "@/components/Notifications";
import PostList from "@/components/PostList";
import Calendar from "@/components/Calendar"; // Import the Calendar component

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("post");

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Dashboard</h2>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "post" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("post")}
        >
          Create Post
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("list")}
        >
          Your Posts
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "notifications" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "calendar" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "post" && <PostForm />}
      {activeTab === "list" && <PostList />}
      {activeTab === "notifications" && <Notifications />}
      {activeTab === "calendar" && <Calendar />}
    </div>
  );
}
