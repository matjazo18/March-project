"use client";
import { useState } from "react";
import Image from "next/image";
export default function InterviewQuestions({ filterElements }) {
  const avatarUrls = [
    "https://randomuser.me/api/portraits/thumb/men/62.jpg",
    "https://randomuser.me/api/portraits/thumb/women/76.jpg",
    "https://randomuser.me/api/portraits/thumb/men/61.jpg",
    "https://randomuser.me/api/portraits/thumb/women/68.jpg",
    "https://randomuser.me/api/portraits/thumb/women/56.jpg",
    "https://randomuser.me/api/portraits/thumb/men/85.jpg",
    "https://randomuser.me/api/portraits/thumb/men/81.jpg",
    "https://randomuser.me/api/portraits/thumb/men/34.jpg",
  ];
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState(0);
  const handleCopyEmail = () => {
    setLoading(true);
    setEmails(emails + 1);
    setLoading(false);
  };
  return (
    <div>
      <h1 className="flex justify-center font-extrabold text-center text-3xl">
        {" "}
        Generate Interview Questions{" "}
      </h1>
      <div className="flex justify-center space-x-4 items-center p-5">
        <div className="w-36 h-36 bg-gray-100 flex justify-center items-center border border-gray-300 rounded-lg shadow-md">
          Q1
        </div>
        <div className="w-36 h-36 bg-gray-100 flex justify-center items-center border border-gray-300 rounded-lg shadow-md">
          Q2
        </div>
        <div className="w-36 h-36 bg-gray-100 flex justify-center items-center border border-gray-300 rounded-lg shadow-md">
          Q3
        </div>
      </div>
      <div className="flex justify-center gap-4 items-center mt-20 rounded-lg">
        <div className="w-[350px] h-[465px] bg-white outline outline-2 outline-customOrange rounded-3xl shadow-xl">
          <div className="flex flex-col justify-start items-start p-8 space-y-6 h-full">
            <div className="space-y-3">
              <h1 className="font-sans text-black font-extrabold text-3xl leading-snug">
                Sign up and get{" "}
                <span className="text-customOrange">your FREE copy!</span>
              </h1>
              <p className="font-sans text-gray-600 text-base">
                Provide your email, and we’ll send you a copy of the tracker for
                free!
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-400 text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>{" "}
                Personal google sheet
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400 text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </svg>
                </span>{" "}
                Custom Dashboard
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400 text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </svg>
                </span>{" "}
                AI Analysis
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400 text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </svg>
                </span>{" "}
                Investing Section
              </li>
            </ul>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full space-y-5"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-customOrange text-sm"
                disabled={loading}
                autoComplete="email"
                name="email"
              />

              <button
                onClick={handleCopyEmail}
                className="bg-customOrange hover:bg-orange-600 text-white font-semibold py-2  px-6 rounded-xl transition duration-300 w-full "
                disabled={loading}
              >
                <div className="flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <span>Sending...</span>
                      <span className="loading loading-spinner loading-sm"></span>
                    </>
                  ) : (
                    <span>Get a copy</span>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>

        <div className="relative w-[350px] h-[465px] bg-gradient-to-b from-black to-gray-900 outline outline-2 outline-customOrange rounded-3xl shadow-xl">
          {/* This badge is now positioned relative to the card */}
          <div className="absolute top-12 right-8 bg-white py-1.5 px-4 rounded-3xl flex items-center justify-center shadow-md outline outline-customOrange">
            <p className="text-sm text-customOrange font-semibold">
              🔥 Save 51%
            </p>
          </div>
          <div className="flex flex-col justify-between p-8 h-full text-white">
            {/* Title & Description */}
            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold text-customOrange tracking-wide">
                ONE TIME PAYMENT
              </h1>
              <p className="text-base text-gray-300">
                Get{" "}
                <span className="font-semibold text-white">
                  3 expert interview questions
                </span>{" "}
                with a single purchase.
              </p>
            </div>

            {/* Features */}
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-400 text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>{" "}
                Personal google sheet
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400 text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>{" "}
                Custom Dashboard
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400 text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>{" "}
                AI Analysis
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400 text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>{" "}
                Investing Section
              </li>
            </ul>

            {/* Pricing Section */}
            <div className="text-center mt-4 flex  items-center gap-1">
              <p className="text-5xl font-extrabold text-slate-200">$19</p>
              <p className="text-xl text-gray-400 line-through">$39</p>
            </div>

            {/* CTA */}
            <button className="bg-customOrange hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-xl transition duration-300 w-full mt-4">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 mt-8">
        <p className="font-sans text-gray-600 text-base">
          <span className="font-extrabold">JOIN</span>
          <span className="font-extrabold text-customOrange"> 1163</span> users
          tracking their finances
        </p>
        <div className="justy-start avatar-group -space-x-3 flex">
          {avatarUrls.map((src, index) => (
            <div
              key={index}
              className="avatar h-9 w-9 border-[2px] rounded-full overflow-hidden"
            >
              <Image
                src={src}
                alt={`Avatar ${index + 1}`}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
