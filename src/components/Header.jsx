import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Social Posting App</h1>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/auth/login" className="hover:underline">
            Login
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}

