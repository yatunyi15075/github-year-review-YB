"use client";

import { useState } from "react";
import Dashboard from "./Dashboard";
import LoadingSpinner from "./LoadingSpinner";
import { fetchGitHubStats } from "@/lib/github";
import { Github, Sparkles, ArrowLeft } from "lucide-react";

export default function UsernameForm() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");

    try {
      const result = await fetchGitHubStats(username.trim());
      setStats(result);
    } catch (err: any) {
      setError(err.message || "Failed to fetch GitHub data. Please check the username and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleReset = () => {
    setStats(null);
    setUsername("");
    setError("");
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      {!stats && !loading && (
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 hover:shadow-3xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg">
                <Github className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-2 text-indigo-600">
              GitHub Year Review
            </h1>

            <p className="text-slate-600 text-center mb-8">
              Generate your annual contribution report
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="github-username"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  GitHub Username
                </label>
                <input
                  id="github-username"
                  type="text"
                  placeholder="Enter your username"
                  className="w-full border-2 border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                  <span className="text-rose-500 font-bold">!</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!username.trim()}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Generate Review
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-20">
          <LoadingSpinner />
        </div>
      )}

      {stats && (
        <>
          <Dashboard stats={stats} />
          <button
            onClick={handleReset}
            className="mt-8 text-slate-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Generate Another Review
          </button>
        </>
      )}
    </div>
  );
}
