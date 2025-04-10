// app/page.js
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function InputAi({ fileContent }) {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [metrics, setMetrics] = useState(null); // Store metrics as an object

  // Load saved input from localStorage
  useEffect(() => {
    const savedValue = localStorage.getItem("userInput");
    if (savedValue) {
      setInputValue(savedValue);
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "1") {
      setInputValue(value);
    } else {
      setDescription(value);
    }
  };

  const handleSave = () => {
    localStorage.setItem("userInput", inputValue);
  };

  const handleGenerate = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setResponse("");
    setMetrics(null);

    try {
      const { data } = await axios.post(
        "/api/GeminiAi",
        {
          prompt: description,
          inputValue,
          fileContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.response) {
        setResponse(data.response);
      } else if (data.error) {
        setResponse(`Error: ${data.error}`);
      }

      if (data.metrics) {
        setMetrics(data.metrics);
      }
    } catch (error) {
      console.error("API Error:", error);
      setResponse(error.response?.data?.error || "Failed to generate response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50  font-sans p-4">
      <div className="mt-8 max-w-2xl mx-auto">
        <div className="p-6 bg-white rounded-xl shadow-md">
          {fileContent ? (
            <>
              <h1 className="text-2xl font-bold text-indigo-600 mb-6">
                Personal letter to the company
              </h1>
              <hr></hr>
              <h2 className="text-xl font-bold text-indigo-600 mb-6">
                some custom desription?
              </h2>

              <textarea
                id="1"
                value={inputValue}
                onChange={handleChange}
                placeholder="100 word long, personal, write it like a student..."
                className="w-full p-4 border border-indigo-100 rounded-lg mb-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700 placeholder-gray-400"
                disabled={isLoading}
              />

              <h1 className="text-xl font-bold text-indigo-600 mb-6">
                Description of the job
              </h1>

              <textarea
                id="2"
                value={description}
                onChange={handleChange}
                placeholder="Anything about the company you want to applay for "
                className="w-full p-4 border border-indigo-100 rounded-lg mb-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700 placeholder-gray-400"
                disabled={isLoading}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 flex items-center transition-all font-medium shadow-md"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (

                    "Create a request to the company"

                  )}
                </button>
              </div>
            </>
          ) : (
            <h1 className=" font-semibold text-xl text-center">
              To continue please Provide your CV
            </h1>
          )}

          {response && (
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="text-md font-semibold text-indigo-700 mb-2">
                AI Response:
              </h3>
              <p className="whitespace-pre-wrap text-gray-700">{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
