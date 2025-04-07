"use client";
import Image from "next/image";
import FileDropArea from "./component/FileDropArea";
import { GoogleGenAI } from "@google/genai";
import InputAi from "./component/InputAi";
import ViewMetrics from "./component/ViewMetrics";
import { useState } from "react";

export default function Home() {
  const [fileContent, setFileContent] = useState("");
  return (
    <div className=" bg-gradient-to-br from-blue-50 to-indigo-50">
      <h1 className="text-6xl text-center font-extrabold py-10 tracking-tight leading-tight">
        From <span className="text-blue-500">CV</span> to{" "}
        <span className="text-green-500">Career</span>:
        <br /> AI-Powered Job Discovery
      </h1>
      <div className=" flex-col justify-center mx-auto space-y-8 pb-40">
        <div className=" flex justify-center">
          <FileDropArea setFileContent={setFileContent} />{" "}
          {fileContent ? <ViewMetrics fileContent={fileContent} /> : <></>}
        </div>
        <InputAi fileContent={fileContent} />
      </div>
    </div>
  );
}
