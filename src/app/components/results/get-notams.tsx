"use server";

type AirportCode = {
  airportCode: string;
};

export async function GetNotams({
  airportCode,
}: AirportCode): Promise<AirportCode> {
  let res = await fetch(
    `https://external-api.faa.gov/notamapi/v1/notams?location=${airportCode}&`,
    {
      method: "GET",
      headers: {
        client_id: process.env.notams_client_id || "",
        client_secret: process.env.notams_client_secret || "",
      },
    }
  );

  let all_notams = await res.json();

  return all_notams.items[all_notams.items.length - 1].properties.coreNOTAMData;
}

export default async function Notams({ airportCode }: AirportCode) {
  const notams: any = await GetNotams({ airportCode });

  return (
    <>
      <div>{notams}</div>
    </>
  );
}
