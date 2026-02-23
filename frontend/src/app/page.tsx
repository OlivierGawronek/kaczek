/// <reference types="chrome" />
"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");

  const handleCheckAd = () => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
        const currentUrl = tabs[0]?.url || "";
        setUrl(currentUrl);
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-gray-900">
      <h1 className="text-2xl font-bold mb-1">Kaczek</h1>
      <p className="text-xs text-center text-gray-500 mb-6">OLX Scam Detector</p>
      
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col items-center">
        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4 text-3xl shadow-inner">
          🦆
        </div>
        
        <p className="text-sm text-gray-600 font-medium mb-5 text-center break-all">
          {url ? url : "Waiting for an ad page..."}
        </p>
        
        <button 
          onClick={handleCheckAd}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
        >
          Check this ad
        </button>
      </div>
    </main>
  );
}