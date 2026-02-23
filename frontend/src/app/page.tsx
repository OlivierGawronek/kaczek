/// <reference types="chrome" />
"use client";

import { useState, useEffect } from "react";

interface CheckResult {
  is_scam: boolean;
  risk_level: string;
  details: string;
}

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
        const currentUrl = tabs[0]?.url || "";
        setUrl(currentUrl);
      });
    }
  }, []);

  const handleCheckAd = async () => {
    if (!url) {
      setError("Cannot fetch URL.");
      return;
    }

    setResult(null);
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/check-ad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Cannot connect to the server.");
    } finally {
      setIsLoading(false);
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
        
        <p className="text-xs text-gray-500 font-medium mb-4 text-center break-all min-h-[32px]">
          {url ? url.substring(0, 60) + (url.length > 60 ? "..." : "") : "Fetching URL..."}
        </p>

        {error && <p className="text-sm text-red-500 mb-3 font-semibold">{error}</p>}

        {result && (
          <div className={`w-full p-3 rounded-lg mb-4 text-center ${result.is_scam ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            <p className="font-bold">{result.is_scam ? "Potential Scam!" : "Safe"}</p>
            <p className="text-xs mt-1">{result.details}</p>
          </div>
        )}
        
        <button 
          onClick={handleCheckAd}
          disabled={isLoading || !url}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:bg-gray-400"
        >
          {isLoading ? "Checking..." : "Check this ad"}
        </button>
      </div>
    </main>
  );
}