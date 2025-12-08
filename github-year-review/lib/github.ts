export async function fetchGitHubStats(username: string) {
  const repos = await fetch(`https://api.github.com/users/${username}/repos`)
    .then((res) => res.json());

  const totalRepos = repos.length;

  const completedRepos = repos.filter(
    (repo: any) => repo.stargazers_count > 0 || repo.forks_count > 0
  ).length;

  const inactiveRepos = totalRepos - completedRepos;

  // Commits require scanning repo activity — simplified for now
  const totalCommits = Math.floor(Math.random() * 500) + 50; // placeholder

  return {
    totalRepos,
    completedRepos,
    inactiveRepos,
    totalCommits,
  };
}
