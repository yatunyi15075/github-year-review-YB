"use client";

import { useState } from "react";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface CalendarData {
  weeks: ContributionWeek[];
}

interface ContributionGridProps {
  calendar: CalendarData;
  forPDF?: boolean;
}

export default function ContributionGrid({ calendar, forPDF = false }: ContributionGridProps) {
  const [color, setColor] = useState("#6366f1"); // indigo-500

  const getDayColor = (dayCount: number) => {
    if (dayCount === 0) return "#e5e7eb"; // gray-200
    return color;
  };

  const getOpacity = (dayCount: number) => {
    if (forPDF) return 1;
    if (dayCount === 0) return 1;
    return Math.min(dayCount / 10 + 0.3, 1);
  };

  const maxContributions = Math.max(
    ...calendar.weeks.flatMap(week => 
      week.contributionDays.map(day => day.contributionCount)
    )
  );

  return (
    <div className="space-y-4">
      {!forPDF && (
        <div className="flex items-center gap-3">
          <label htmlFor="grid-color" className="text-sm font-medium text-slate-700">
            Grid Color:
          </label>
          <input
            id="grid-color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 rounded border-2 border-slate-300 cursor-pointer"
          />
        </div>
      )}

      <div className="overflow-x-auto pb-2">
        <div className="inline-grid grid-flow-col gap-1 min-w-max">
          {calendar.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {week.contributionDays.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`}
                  className="w-3 h-3 rounded-sm hover:ring-2 hover:ring-indigo-400 transition-all cursor-pointer"
                  style={{
                    backgroundColor: getDayColor(day.contributionCount),
                    opacity: getOpacity(day.contributionCount),
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>Less</span>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-3 h-3 rounded-sm"
              style={{
                backgroundColor: level === 0 ? "#e5e7eb" : color,
                opacity: level === 0 ? 1 : 0.3 + (level * 0.175),
              }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
