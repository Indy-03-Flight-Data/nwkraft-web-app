"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import arrow from "@/app/public/arrow_forward.png";
import Link from "next/link";
interface FavoriteAirport {
  code: string;
  airport_name: string;
}

export default function FavoriteAirports() {
  const [favorites, setFavorites] = useState<FavoriteAirport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites");
        if (!response.ok) {
          throw new Error("Failed to fetch favorite airports");
        }
        const data = await response.json();
        setFavorites(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
        Favorite Airports
      </h2>
      {favorites.length > 0 ? (
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {favorites.map((airport) => (
            <li key={airport.code} className="py-3">
              <div className="flex items-center space-x-4">
                <div className="grow inline-flex">
                  <p>
                    {airport.code} - {airport.airport_name}
                  </p>
                </div>
                <div className="inline-flex items-end bg-gray-600 p-1 hover:cursor-pointer hover:bg-gray-400 rounded-full">
                  <Link href={"/dashboard/search/" + airport.code}>
                    <Image src={arrow} width={24} height={24} alt="favorite" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite airports found.</p>
      )}
    </div>
  );
}
