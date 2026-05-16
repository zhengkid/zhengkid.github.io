(function () {
  async function loadGithubStars() {
    const links = document.querySelectorAll("[data-github-repo]");

    await Promise.all(
      Array.from(links).map(async (link) => {
        const repo = link.dataset.githubRepo;
        const label = link.dataset.githubLabel || "code";

        try {
          const response = await fetch(`https://api.github.com/repos/${repo}`);
          if (!response.ok) throw new Error("GitHub API error");

          const data = await response.json();
          const stars = Number(data.stargazers_count).toLocaleString("en-US");
          link.textContent = `${label} ★ ${stars}`;
        } catch {
          link.textContent = label;
        }
      })
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadGithubStars);
  } else {
    loadGithubStars();
  }
})();
