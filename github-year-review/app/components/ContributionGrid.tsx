export default function ContributionGrid({ calendar }: any) {
  return (
    <div className="grid grid-cols-53 gap-1">
      {calendar.weeks.map((week: any, i: number) =>
        week.contributionDays.map((day: any, j: number) => (
          <div
            key={`${i}-${j}`}
            title={`${day.date} — ${day.contributionCount} commits`}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: day.color }}
          ></div>
        ))
      )}
    </div>
  );
}
