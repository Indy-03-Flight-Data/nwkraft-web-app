"use client";

import { useState } from "react";
import Image from "next/image";
import star_fill from "@/app/public/star_fill.png";
import star_nofill from "@/app/public/star_nofill.png";
import { AddFavorite, RemoveFavorite } from "@/app/_actions/add-remove-favorite";

export default function FavoritesOption({
  airportCode,
}: {
  airportCode: string;
}) {
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(false);

  const handleOnClick = () => {
    if (favoriteStatus === false) {
      AddFavorite({ airportCode });
    }
    if (favoriteStatus === true) {
        RemoveFavorite({ airportCode });
      }
    setFavoriteStatus(!favoriteStatus);
  };

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
