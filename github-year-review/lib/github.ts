// lib/github.ts
export async function fetchGitHubStats(username: string) {
  if (!username) throw new Error("Username is required");
  
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (!token) throw new Error("GitHub token not found in .env.local");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // 1. Fetch user profile
  let user;
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (!res.ok) throw new Error(`GitHub API Error: ${res.status}`);
    user = await res.json();
  } catch (err) {
    console.error("Error fetching user profile:", err);
    throw err;
  }

  const name = user.name || username;

  // 2. Fetch repos
  let repos;
  try {
    const res = await fetch(user.repos_url, { headers });
    if (!res.ok) throw new Error(`GitHub API Error fetching repos: ${res.status}`);
    repos = await res.json();
  } catch (err) {
    console.error("Error fetching repos:", err);
    repos = [];
  }

  const totalRepos = repos.length;
  const totalStars = repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0);
  const completedRepos = repos.filter((r: any) => (r.stargazers_count > 0 || r.forks_count > 0)).length;
  const inactiveRepos = totalRepos - completedRepos;

  // 3. Languages
  const languages: Record<string, number> = {};
  for (let repo of repos) {
    if (!repo.languages_url) continue;
    try {
      const res = await fetch(repo.languages_url, { headers });
      if (!res.ok) continue;
      const data = await res.json();
      for (let lang in data) {
        languages[lang] = (languages[lang] || 0) + data[lang];
      }
    } catch (err) {
      console.error("Error fetching repo languages:", err);
    }
  }

  // 4. PRs
  let prsCount = 0;
  try {
    const res = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`,
      { headers }
    );
    if (res.ok) {
      const data = await res.json();
      prsCount = data.total_count;
    }
  } catch (err) {
    console.error("Error fetching PRs:", err);
  }

  // 5. Issues
  let issuesCount = 0;
  try {
    const res = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:issue`,
      { headers }
    );
    if (res.ok) {
      const data = await res.json();
      issuesCount = data.total_count;
    }
  } catch (err) {
    console.error("Error fetching issues:", err);
  }

  // 6. Contribution Calendar (GraphQL)
  let calendar = { weeks: [], totalContributions: 0 };
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
        query {
          user(login: "${username}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    color
                  }
                }
              }
            }
          }
        }`,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      calendar = data.data.user.contributionsCollection.contributionCalendar;
    }
  } catch (err) {
    console.error("Error fetching contribution calendar:", err);
  }

  // 7. Most active day/month
  let dayCounts: Record<string, number> = {};
  let monthCounts: Record<string, number> = {};

  calendar.weeks.forEach((week: any) => {
    week.contributionDays.forEach((day: any) => {
      const date = new Date(day.date);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const monthName = date.toLocaleDateString("en-US", { month: "long" });
      dayCounts[dayName] = (dayCounts[dayName] || 0) + day.contributionCount;
      monthCounts[monthName] = (monthCounts[monthName] || 0) + day.contributionCount;
    });
  });

  const mostActiveDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  const mostActiveMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return {
    name,
    totalRepos,
    totalStars,
    completedRepos,
    inactiveRepos,
    mergedPRs: prsCount,
    issues: issuesCount,
    languages,
    calendar,
    totalCommits: calendar.totalContributions,
    mostActiveDay,
    mostActiveMonth,
  };
}
