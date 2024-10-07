"use server";

type AirportCode = {
  airportCode: string;
};

export default async function GetNotams({ airportCode }: AirportCode) {
  let res = await fetch(
    "https://external-api.faa.gov/notamapi/v1/notams",
    {
      method: "GET",
      headers: {
        client_id: "",
        client_secret: "",
      },
    }
  );

  let notams = await res.json();

  let result = JSON.stringify(notams.items[0]);

  return(<div>{result}</div>);
}
