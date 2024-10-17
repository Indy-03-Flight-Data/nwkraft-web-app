"use server";

import { GetNotams } from "@/app/_actions/get-notams";
import { AirportCode } from "@/app/_lib/definitions";

export default async function NotamsResults({ airportCode }: AirportCode) {
  const notams = await GetNotams({ airportCode });
  return (
    <div>
      {notams.map((item) => (
        <div key={item.id} className="bg-zinc-800 p-5 m-5">
          <p>Effective Start Date: {item.effectiveStart}</p>
          <p>Effective End Date: {item.effectiveEnd}</p>
          <p>Description: {item.text}</p>
          <p>Last Updated: {item.lastUpdated}</p>
        </div>
      ))}
    </div>
  );
}
