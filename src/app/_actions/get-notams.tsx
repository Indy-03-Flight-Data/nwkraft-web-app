"use server";

import { Notam, AirportCode } from "@/app/_lib/definitions";

export async function GetNotams({
  airportCode,
}: AirportCode): Promise<Notam[]> {
  let res = await fetch(
    `https://external-api.faa.gov/notamapi/v1/notams?icaoLocation=${airportCode}`,
    {
      method: "GET",
      headers: {
        client_id: process.env.notams_client_id || "",
        client_secret: process.env.notams_client_secret || "",
      },
    }
  );

  //console.log("Fetched NOTAMS");

  let notams = await res.json();

  let items = notams.items;

  let notams_items: Notam[] = [];

  //grabs each notam's properties for specific airport
  //adds to notams_items array to be returned as a prop
  for (const key in items) {
    let notam_data: Notam = {
      id: items[key].properties.coreNOTAMData.notam.id,
      effectiveStart: items[key].properties.coreNOTAMData.notam.effectiveStart,
      effectiveEnd: items[key].properties.coreNOTAMData.notam.effectiveEnd,
      text: items[key].properties.coreNOTAMData.notam.text,
      lastUpdated: items[key].properties.coreNOTAMData.notam.lastUpdated,
    };
    notams_items.push(notam_data);
  }

  return notams_items as Notam[];
}

