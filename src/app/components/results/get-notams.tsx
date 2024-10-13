"use server";

type AirportCode = {
  airportCode: string;
};

type Notam = {
  effectiveStart: string;
  effectiveEnd: string;
  text: string;
  lastUpdated: string;
};

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

  let notams = await res.json();

  let items = notams.items;

  let notams_items: Notam[] = [];

  //grabs each notam's properties for specific airport
  //adds to notams_items array to be returned as a prop
  for (const key in items) {
    let notam_data: Notam = {
      effectiveStart: items[key].properties.coreNOTAMData.notam.effectiveStart,
      effectiveEnd: items[key].properties.coreNOTAMData.notam.effectiveEnd,
      text: items[key].properties.coreNOTAMData.notam.text,
      lastUpdated: items[key].properties.coreNOTAMData.notam.lastUpdated,
    };
    notams_items.push(notam_data);
  }

  return notams_items as Notam[];
}

export default async function Notams({ airportCode }: AirportCode) {
  const notams: Notam[] = await GetNotams({ airportCode });

  return (
    <>
      <div>
        <ul className="grow text-left">
          {notams.map((item) => (
            <li>
              <p>{item.effectiveStart}</p>
              <p>{item.effectiveEnd}</p>
              <p>{item.text}</p>
              <p>{item.lastUpdated}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
