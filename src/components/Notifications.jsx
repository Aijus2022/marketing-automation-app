"use client";

import { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification
  const addNotification = (message) => {
    setNotifications((prev) => [...prev, message]);
  };

  useEffect(() => {
    const handlePostPublished = (event) => {
      const { title, socialMedia } = event.detail; // Details of the published post
      const message = `Post "${title}" was successfully published on ${socialMedia}.`;
      addNotification(message);
    };

    // Listen for "post-published" events from the Calendar
    window.addEventListener("post-published", handlePostPublished);

    return () => {
      // Cleanup the event listener
      window.removeEventListener("post-published", handlePostPublished);
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-xl font-bold mb-4">Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded">
              {notification}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



