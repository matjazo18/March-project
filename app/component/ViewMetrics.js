"use client";
import { useState } from "react";
import axios from "axios";

export default function ViewMetrics({ fileContent }) {
  const [open, setToOpen] = useState(false);
  const [view, setView] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setclose = () => {
    setToOpen(false);
    setView(null);
    setError(null);
  };

  const inputValue =
    "From the CV make a metric on scale from 1 to 10 how much is this person social, physical, communicative, technical and creative. Also add some emojis and only the metric and the score along with it. Write only metrics with no other text and separate them with ,. And don't give so much point the cv should have atleat 3 things to get to 7/10 and if they have only 1 experience with working physical that would be like  a 2/10";

  const handleGenerate = async () => {
    setLoading(true);
    setToOpen(true);
    setError(null);
    try {
      const response = await axios.post(
        "/api/fiveSkilLevel",
        {
          prompt: fileContent,
          inputValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Access the response data correctly
      if (response.data?.response) {
        setView(response.data.response);
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError(error.response?.data?.error || "Failed to generate response");
      setView(null);
    } finally {
      setLoading(false);
    }
  };

  const getProgressColor = (value) => {
    if (value >= 80) return "progress-success";
    if (value >= 60) return "progress-warning";
    if (value >= 40) return "progress-info";
    return "progress-error";
  };

  const renderSkills = () => {
    console.log("Current view:", view); // Debug log

    if (!view || typeof view !== "string") {
      console.log("View is not a valid string"); // Debug log
      return null;
    }

    try {
      const skillEntries = view.split(",").map((entry) => entry.trim());
      console.log("Skill entries:", skillEntries); // Debug log

      const skills = skillEntries
        .map((entry, index) => {
          const match = entry.match(/([^:]+):\s*([^\s]+)\s*(\d+)/);
          console.log("Entry:", entry, "Match:", match); // Debug log

          if (!match) return null;

          const skillName = match[1].trim();
          const emoji = match[2];
          const value = parseInt(match[3], 10);
          const displayValue = value * 10;

          return (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-semibold">{skillName}</span>
                <span>
                  {emoji} {value}/10
                </span>
              </div>
              <progress
                className={`progress ${getProgressColor(
                  displayValue
                )} w-full h-4`}
                value={displayValue}
                max="100"
              ></progress>
            </div>
          );
        })
        .filter(Boolean); // Remove null entries

      console.log("Rendered skills:", skills); // Debug log

      if (skills.length === 0) {
        return (
          <div className="alert alert-warning">
            <span>No valid skills found in the response</span>
          </div>
        );
      }

      return skills;
    } catch (error) {
      console.error("Error parsing skills:", error);
      return (
        <div className="alert alert-error">
          <span>Error displaying skills metrics</span>
        </div>
      );
    }
  };

  return (
    <div className="flex justify-center">
      {!open ? (
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
              Generating...
            </>
          ) : (
            <>
              Generate Metrics
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </>
          )}
        </button>
      ) : (
        <div className="relative bg-base-100 p-6 rounded-box shadow-lg w-80">
          <button
            onClick={setclose}
            className="btn btn-circle btn-sm absolute -right-3 -top-3"
            aria-label="Close"
          >
            ✕
          </button>

          <h3 className="text-xl font-bold mb-4">Skills Assessment</h3>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-40">
              <span className="loading loading-spinner loading-lg"></span>
              <p className="mt-4">Analyzing skills...</p>
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          ) : view ? (
            <div className="space-y-5">
              {" "}
              {view ? (
                renderSkills()
              ) : (
                <div className="alert alert-warning">
                  <span>No metrics data available</span>
                </div>
              )}
            </div>
          ) : (
            <div className="alert alert-error">
              <span>No metrics available</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
