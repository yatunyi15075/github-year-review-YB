// lib/contributions.ts
// Helper functions for GitHub contribution calendar

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

/**
 * Flatten the contribution calendar into an array of days
 */
export function flattenCalendar(calendar: ContributionCalendar): ContributionDay[] {
  return calendar.weeks.flatMap((week) => week.contributionDays);
}

/**
 * Get the month with the highest total contributions
 */
export function mostActiveMonth(calendar: ContributionCalendar): string {
  const months: Record<string, number> = {};

  flattenCalendar(calendar).forEach((day) => {
    const month = new Date(day.date).toLocaleString("default", { month: "long" });
    if (!months[month]) months[month] = 0;
    months[month] += day.contributionCount;
  });

  let maxMonth = "";
  let maxCount = 0;
  for (const [month, count] of Object.entries(months)) {
    if (count > maxCount) {
      maxCount = count;
      maxMonth = month;
    }
  }

  return maxMonth;
}

/**
 * Get the longest contribution streak
 */
export function longestStreak(calendar: ContributionCalendar): number {
  let maxStreak = 0;
  let currentStreak = 0;

  flattenCalendar(calendar)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .forEach((day) => {
      if (day.contributionCount > 0) {
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
      } else {
        currentStreak = 0;
      }
    });

  return maxStreak;
}
