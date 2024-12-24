"use client";

import { useState, useEffect } from "react";
import { getCampaigns, saveCampaign } from "@/utils/localStorage";

export default function Calendar() {
  const [days, setDays] = useState([]);
  const [monthYear, setMonthYear] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [campaignDetails, setCampaignDetails] = useState({
    title: "",
    socialMedia: "",
    time: "",
  });

  const generateCalendarDays = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const monthName = now.toLocaleString("default", { month: "long" });
    setMonthYear(`${monthName} ${year}`);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const campaigns = getCampaigns();

    const calendarDays = [];
    let currentDate = new Date(firstDay);

    while (currentDate <= lastDay) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const campaign = campaigns.find((c) => c.date === dateStr);

      calendarDays.push({
        date: dateStr,
        campaignTitle: campaign?.title || null,
        socialMedia: campaign?.socialMedia || null,
        scheduledTime: campaign?.time || null,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return calendarDays;
  };

  useEffect(() => {
    const fetchData = () => {
      setDays(generateCalendarDays());
    };

    fetchData();

    // Add an event listener to handle localStorage changes
    window.addEventListener("storage", fetchData);

    return () => {
      window.removeEventListener("storage", fetchData);
    };
  }, []);

  const handleSaveCampaign = () => {
    if (!selectedDate) return;

    const newCampaign = {
      date: selectedDate,
      ...campaignDetails,
    };
    saveCampaign(newCampaign);

    // Refresh the calendar
    setDays(generateCalendarDays());

    // Reset form
    setSelectedDate(null);
    setCampaignDetails({ title: "", socialMedia: "", time: "" });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{monthYear}</h2>
      <div className="grid grid-cols-7 gap-4 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold text-lg text-gray-700">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`border p-4 rounded shadow bg-gray-100 flex flex-col items-center cursor-pointer ${
              day.campaignTitle ? "bg-blue-100" : ""
            }`}
            onClick={() => {
              setSelectedDate(day.date);
              setCampaignDetails({
                title: day.campaignTitle || "",
                socialMedia: day.socialMedia || "",
                time: day.scheduledTime || "",
              });
            }}
          >
            <div className="font-bold mb-2">{new Date(day.date).getDate()}</div>
            {day.campaignTitle ? (
              <>
                <div className="text-blue-500 text-sm">{day.campaignTitle}</div>
                <div className="text-sm">{day.socialMedia}</div>
                <div className="text-xs text-gray-500">{day.scheduledTime}</div>
              </>
            ) : (
              <p className="text-gray-400 text-sm">No campaign</p>
            )}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-6 p-4 border rounded shadow bg-white">
          <h3 className="text-xl font-bold mb-4">
            Add/Edit Campaign for {selectedDate}
          </h3>
          <input
            type="text"
            placeholder="Campaign Title"
            value={campaignDetails.title}
            onChange={(e) =>
              setCampaignDetails({ ...campaignDetails, title: e.target.value })
            }
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Social Media Platform"
            value={campaignDetails.socialMedia}
            onChange={(e) =>
              setCampaignDetails({
                ...campaignDetails,
                socialMedia: e.target.value,
              })
            }
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          <input
            type="time"
            value={campaignDetails.time}
            onChange={(e) =>
              setCampaignDetails({ ...campaignDetails, time: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded"
          />
          <button
            onClick={handleSaveCampaign}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Campaign
          </button>
        </div>
      )}
    </div>
  );
}




