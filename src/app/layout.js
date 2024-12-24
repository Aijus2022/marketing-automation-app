import "./globals.css";
import Header from "@/components/Header";
import { PostsProvider } from "@/context/PostsContext";

export const metadata = {
  title: "Social Posting App",
  description: "Centralized platform for managing social media posts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans text-gray-900">
        <Header />
        <PostsProvider>
          <main className="container mx-auto p-4">{children}</main>
        </PostsProvider>
      </body>
    </html>
  );
}

