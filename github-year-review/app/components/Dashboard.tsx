import ContributionGrid from "./ContributionGrid";
import LanguagesChart from "./LanguagesChart";
import StatsCard from "./StatsCard";

export default function Dashboard({ stats, username }: any) {
  const { calendar, languages } = stats;

  return (
    <div className="mt-10 w-full max-w-4xl bg-white p-8 rounded-xl shadow">
      <h2 className="text-3xl font-semibold mb-4">
        {username}'s GitHub Year Review 🎉
      </h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <StatsCard title="Total Commits" value={stats.totalCommits} />
        <StatsCard title="Total Repositories" value={stats.totalRepos} />
        <StatsCard title="Stars Gained" value={stats.totalStars} />
        <StatsCard title="Merged Pull Requests" value={stats.mergedPRs} />
        <StatsCard title="Issues Created" value={stats.issues} />
        <StatsCard title="Completed Projects" value={stats.completedRepos} />
      </div>

      {/* Contribution Calendar */}
      <h3 className="text-xl font-bold mb-2">Contributions (Green Grid)</h3>
      <ContributionGrid calendar={calendar} />

      {/* Languages */}
      <h3 className="text-xl font-bold mt-10 mb-2">Languages Used</h3>
      <LanguagesChart data={languages} />

      <div className="mt-6">
        <button className="bg-black text-white py-2 px-4 rounded">
          Download PDF
        </button>
      </div>
    </div>
  );
}
