import UsernameForm from "./components/UsernameForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">GitHub Year Review</h1>
      <p className="text-gray-600 mb-6 text-center">
        Enter your GitHub username to see your activity for 2024.
      </p>
      <UsernameForm />
    </main>
  );
}
