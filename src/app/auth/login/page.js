"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Login with Google
      </button>
    </div>
  );
}
