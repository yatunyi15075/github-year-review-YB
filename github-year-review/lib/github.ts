// lib/github.ts

export async function fetchGitHubStats(username: string) {
  // 1. Basic profile data
  const user = await fetch(`https://api.github.com/users/${username}`).then(res => res.json());

  // 2. Fetch all repos
  const repos = await fetch(user.repos_url).then(res => res.json());

  const totalRepos = repos.length;

  const totalStars = repos.reduce((sum: number, r: any) => sum + r.stargazers_count, 0);

  const completedRepos = repos.filter((r: any) =>
    r.stargazers_count > 0 || r.forks_count > 0
  ).length;

  const inactiveRepos = totalRepos - completedRepos;

  // 3. Languages summary
  let languages: any = {};

  for (let repo of repos) {
    const langData = await fetch(repo.languages_url).then(res => res.json());

    for (let lang in langData) {
      if (!languages[lang]) languages[lang] = 0;
      languages[lang] += langData[lang];
    }
  }

  // 4. PRs merged
  const prs = await fetch(
    `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`
  ).then(res => res.json());

  // 5. Issues created
  const issues = await fetch(
    `https://api.github.com/search/issues?q=author:${username}+type:issue`
  ).then(res => res.json());

  // 6. Contribution calendar (GraphQL)
  const contributionData = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
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
  }).then(res => res.json());

  const calendar =
    contributionData.data.user.contributionsCollection.contributionCalendar;

  return {
    totalRepos,
    totalStars,
    completedRepos,
    inactiveRepos,
    issues: issues.total_count,
    mergedPRs: prs.total_count,
    languages,
    calendar,
    totalCommits: calendar.totalContributions,
  };
}
