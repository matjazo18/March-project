"use client";
import { useState } from "react";
import axios from "axios";

export default function ViewMetrics({ fileContent }) {
  const [open, setToOpen] = useState(false);
  const [view, setView] = useState(null);
  const [loading, setLoading] = useState(false);

  const setclose = () => {
    setToOpen(false);
    setView(null);
  };

  const inputValue =
    "From the CV make a metric on scale from 1 to 10 how much is this person social, physical, communicative, technical and creative. Also add some emojis and only the metric and the score along with it.";

  const handleGenerate = async () => {
    setLoading(true);
    setToOpen(true);
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
      setView(response.data);
    } catch (error) {
      console.error("API Error:", error);
      setView({
        error: error.response?.data?.error || "Failed to generate response",
      });
    } finally {
      setLoading(false);
    }
  };

  const parseMetrics = (data) => {
    if (!data) return [];

    if (data.error) {
      return [{ name: "Error", description: data.error }];
    }

    if (Array.isArray(data)) {
      return data;
    }

    if (typeof data === "string") {
      return data
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => {
          const [namePart, ...descParts] = line.split(":");
          const description = descParts.join(":").trim();
          const match = description.match(/(\d+)\/10/);
          const value = match ? parseInt(match[1]) * 10 : 0;
          return {
            name: namePart?.trim() || "Unknown",
            description,
            value,
          };
        });
    }

    return Object.entries(data).map(([name, description]) => ({
      name,
      description: String(description),
      value: 50, // Default value if we can't parse from object
    }));
  };

  const metrics = parseMetrics(view);

  // Color mapping for different skill levels
  const getProgressColor = (value) => {
    if (value >= 80) return "progress-success";
    if (value >= 60) return "progress-primary";
    if (value >= 40) return "progress-warning";
    return "progress-error";
  };

  return (
    <div className="flex justify-center ">
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
          ) : metrics.length > 0 ? (
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Social</span>
                  <span>🤝 8/10</span>
                </div>
                <progress
                  className={`progress ${getProgressColor(80)} w-full h-4`}
                  value={80}
                  max="100"
                ></progress>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Physical</span>
                  <span>💪 9/10</span>
                </div>
                <progress
                  className={`progress ${getProgressColor(90)} w-full h-4`}
                  value={90}
                  max="100"
                ></progress>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Communicative</span>
                  <span>🗣️ 8/10</span>
                </div>
                <progress
                  className={`progress ${getProgressColor(80)} w-full h-4`}
                  value={80}
                  max="100"
                ></progress>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Technical</span>
                  <span>💻 7/10</span>
                </div>
                <progress
                  className={`progress ${getProgressColor(70)} w-full h-4`}
                  value={70}
                  max="100"
                ></progress>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Creative</span>
                  <span>🎨 6/10</span>
                </div>
                <progress
                  className={`progress ${getProgressColor(60)} w-full h-4`}
                  value={60}
                  max="100"
                ></progress>
              </div>
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
