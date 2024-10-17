"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FavoriteAirports from "@/app/components/favorites/FavoriteAirports"; 
import Autocomplete from "@/app/components/search/autocomplete"; 

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") {
    router.push("/signin");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Welcome, {session?.user?.username}!
        </h1>

        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300 text-sm"
        >
          Sign Out
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center mb-6">
          <Autocomplete />
        </div>
      </div>

      <div className="p-8">
        <FavoriteAirports />
      </div>
    </div>
  );
}

