import StatsCard from "./StatsCard";

export default function Dashboard({ stats, username }: any) {
  return (
    <div className="mt-10 w-full max-w-3xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">
        {username}'s GitHub Year Review 🎉
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard title="Total Commits" value={stats.totalCommits} />
        <StatsCard title="Total Repositories" value={stats.totalRepos} />
        <StatsCard title="Completed Projects" value={stats.completedRepos} />
        <StatsCard title="Inactive Projects" value={stats.inactiveRepos} />
      </div>

      <div className="mt-6">
        <button className="bg-black text-white py-2 px-4 rounded">
          Download PDF
        </button>
      </div>
    </div>
  );
}
