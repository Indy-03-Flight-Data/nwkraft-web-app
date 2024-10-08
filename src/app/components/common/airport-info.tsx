"use server";

//AirportInfo definition, returned by API/Airport
interface AirportInfo {
  elevation_ft: number;
  ident: string;
  name: string;
  type: string;
  latitude_deg: number;
  longitude_deg: number;
  municipality: string;
  iso_region: string;
}

//server action to retrieve the airport information.
async function GetAirportInfo({
  airportCode,
}: {
  airportCode: string;
}): Promise<AirportInfo> {
  let res = await fetch(`http://localhost:3000/api/airport/${airportCode}`);
  const airportInfo: AirportInfo = await res.json();

  return airportInfo;
}

//component to be rendered and passed to UI
export default async function AirportInfo({
  airportCode,
}: {
  airportCode: string;
}) {
  //does not render until airport info is returned
  const airportInfo: AirportInfo = await GetAirportInfo({ airportCode });

  return (
    <div className="p-6  rounded-lg mb-4 text-black">
      <p className="text-2xl font-bold">{airportInfo.name}</p>
      <p id="ident">
        <strong>Identifier:</strong> {airportInfo.ident}
      </p>
      <p>
        <strong>Type:</strong> {airportInfo.type}
      </p>
      <p>
        <strong>Elevation (ft):</strong> {airportInfo.elevation_ft}
      </p>
      <p>
        <strong>Latitude:</strong> {airportInfo.latitude_deg}
      </p>
      <p>
        <strong>Longitude:</strong> {airportInfo.longitude_deg}
      </p>
      <p>
        <strong>Municipality:</strong> {airportInfo.municipality}
      </p>
      <p>
        <strong>ISO Region:</strong> {airportInfo.iso_region}
      </p>
    </div>
  );
}
