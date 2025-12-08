"use client";

import { useState } from "react";
import Dashboard from "./Dashboard";
import LoadingSpinner from "./LoadingSpinner";
import { fetchGitHubStats } from "@/lib/github";

export default function UsernameForm() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    const result = await fetchGitHubStats(username);
    setStats(result);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      {!stats && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="GitHub username"
            className="border rounded-lg p-3 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800"
          >
            Generate Review
          </button>
        </form>
      )}

      {loading && (
        <div className="mt-10 flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {stats && <Dashboard stats={stats} username={username} />}
    </div>
  );
}
