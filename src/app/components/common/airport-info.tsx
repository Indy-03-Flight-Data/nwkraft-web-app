"use server";

type AirportInfo = {
  elevation_ft: number;
  ident: string;
  name: string;
  type: string;
  latitude_deg: number;
  longitude_deg: number;
  municipality: string;
  iso_region: string;
};

export default async function AirportInfo({ airportCode }: any) {
  let res = await fetch("http://localhost:3000/api/airport/" + airportCode);
  let airportInfo: any = res.json;

  return (
    <div className="p-6 bg-gray-200 rounded-lg mb-4 text-black">
      <h2 className="text-lg font-bold ">Airport Information</h2>
      <p>
        <strong>Name:</strong> {airportInfo.name}
      </p>
      <p>
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
