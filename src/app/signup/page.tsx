"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specialKey, setSpecialKey] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, key: specialKey }),
    });

    const result = await response.json();
    if (response.ok) {
      router.push("/signin"); // Redirect to sign-in page after successful signup
    } else {
      setMessage(result.error || "Failed to create account.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-8 rounded-lg shadow-md w-96 bg-white"
      >
        <h1 className="text-2xl mb-4 text-center">Sign Up</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mb-4 p-2 border rounded w-full text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 p-2 border rounded w-full text-black"
        />
        <input
          type="text"
          placeholder="Special Key"
          value={specialKey}
          onChange={(e) => setSpecialKey(e.target.value)}
          required
          className="mb-4 p-2 border rounded w-full text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
}
