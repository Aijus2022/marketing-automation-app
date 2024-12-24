"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    date: "",
    time: "",
    socialMedia: "",
  });

  // Load campaigns from localStorage on component mount
  useEffect(() => {
    const storedCampaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
    setCampaigns(storedCampaigns);
  }, []);

  // Save campaigns to localStorage
  const saveCampaignsToLocalStorage = (updatedCampaigns) => {
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
  };

  // Add a new campaign
  const addCampaign = () => {
    if (!newCampaign.title || !newCampaign.date || !newCampaign.time || !newCampaign.socialMedia) {
      alert("Please fill in all fields!");
      return;
    }
    const updatedCampaigns = [...campaigns, newCampaign];
    setCampaigns(updatedCampaigns); // Update state
    saveCampaignsToLocalStorage(updatedCampaigns); // Persist data
    setNewCampaign({ title: "", date: "", time: "", socialMedia: "" }); // Reset form
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Campaign Management</h1>

      {/* Add Campaign Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Campaign Title"
          className="border rounded p-2 mr-2"
          value={newCampaign.title}
          onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
        />
        <input
          type="date"
          className="border rounded p-2 mr-2"
          value={newCampaign.date}
          onChange={(e) => setNewCampaign({ ...newCampaign, date: e.target.value })}
        />
        <input
          type="time"
          className="border rounded p-2 mr-2"
          value={newCampaign.time}
          onChange={(e) => setNewCampaign({ ...newCampaign, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Social Media (e.g., Twitter)"
          className="border rounded p-2 mr-2"
          value={newCampaign.socialMedia}
          onChange={(e) => setNewCampaign({ ...newCampaign, socialMedia: e.target.value })}
        />
        <button
          onClick={addCampaign}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Campaign
        </button>
      </div>

      {/* Campaign List */}
      <ul className="list-disc pl-5">
        {campaigns.map((campaign, index) => (
          <li key={index} className="mb-2">
            {campaign.title} - {campaign.date} {campaign.time} on {campaign.socialMedia}
          </li>
        ))}
      </ul>
    </div>
  );
}

