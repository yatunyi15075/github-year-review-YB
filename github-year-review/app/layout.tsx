import "./globals.css";

export const metadata = {
  title: "GitHub Year Review",
  description: "Analyze your GitHub activity for the year",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
