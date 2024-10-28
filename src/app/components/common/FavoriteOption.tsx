"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import star_fill from "@/app/public/star_fill.png";
import star_nofill from "@/app/public/star_nofill.png";

export default function FavoritesOption({
  airportCode,
}: {
  airportCode: string;
}) {
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleOnClick = () => {
    if (favoriteStatus === false) {
      fetch(`http://localhost:3000/api/favorite/${airportCode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    if (favoriteStatus === true) {
      fetch(`http://localhost:3000/api/favorite/${airportCode}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    setFavoriteStatus(!favoriteStatus);
  };

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const response = await fetch(`/api/favorite/${airportCode}`);
        if (!response.ok) {
          throw new Error("Failed to fetch favorite status");
        }
        const results = await response.json();
        if (results.length > 0) {
          setFavoriteStatus(true);
        } else {
          setFavoriteStatus(false);
        }
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

    fetchFavorite();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid justify-center hover:cursor-pointer">
      <div onClick={handleOnClick}>
        {favoriteStatus ? (
          <Image src={star_fill} width={50} height={50} alt="favorite" />
        ) : (
          <Image src={star_nofill} width={50} height={50} alt="not favorite" />
        )}
      </div>
    </div>
  );
}
