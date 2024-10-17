"use client";

import { useEffect, useState } from "react";

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
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Favorite Airports</h2>
      {favorites.length > 0 ? (
        <ul className="list-disc list-inside">
          {favorites.map((airport) => (
            <li key={airport.code}>
              {airport.code} - {airport.airport_name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite airports found.</p>
      )}
    </div>
  );
}
