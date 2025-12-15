# GitHub Year Review 

A simple and fun web app that generates your **GitHub Year in Review** using the GitHub API. Just paste your GitHub username and instantly get insights into your activity, contributions, and overall stats for the year.

This project was built as a YouTube tutorial for my channel **Coding with Brian**.

---

## ✨ Features

* 🔍 Enter any GitHub username
* 📊 View GitHub activity and contribution stats
* ⚡ Fast and responsive UI
* 🌐 Uses the official GitHub API
* 💻 Modern frontend built with **Next.js + TypeScript (TSX)**

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, TypeScript (TSX)
* **API:** GitHub REST API
* **Styling:** CSS / Tailwind (depending on your setup)
* **Deployment:** Vercel (recommended)

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/github-year-review.git
cd github-year-review
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Set up environment variables

Create a `.env.local` file in the root of the project and add:

```env
GITHUB_TOKEN=your_github_personal_access_token
```

> ⚠️ The token is optional but recommended to avoid GitHub API rate limits.

### 4️⃣ Run the development server

```bash
npm run dev
# or
yarn dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📌 How It Works

1. User enters a GitHub username
2. App fetches data from the GitHub API
3. Stats are processed and displayed as a year review

---

## 🎥 YouTube Tutorial

This project was built on my YouTube channel:

👉 **Coding with Brian**

If you enjoy this project, consider subscribing and checking out more tutorials.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`feature/new-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you found this project helpful:

* ⭐ Star the repository
* 📺 Subscribe to **Coding with Brian**
* 🧑‍💻 Share it with other developers

---

Happy coding! 🎉
