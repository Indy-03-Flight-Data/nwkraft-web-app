"use server";

export async function AddFavorite({ airportCode }: { airportCode: string }) {
  console.log(`adding ${airportCode}`);
  const response = await fetch(
    `http://localhost:3000/api/favorite/${airportCode}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_id: 1,
      }),
    }
  );
  console.log(response);
}

export async function RemoveFavorite({ airportCode }: { airportCode: string }) {
  console.log(`adding ${airportCode}`);
  const response = await fetch(
    `http://localhost:3000/api/favorite/${airportCode}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_id: 1,
      }),
    }
  );
  console.log(response);
}
