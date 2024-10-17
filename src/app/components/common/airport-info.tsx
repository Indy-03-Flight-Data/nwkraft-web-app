"use server";

import { AirportInfo as AirportInfoType } from "@/app/_lib/definitions";
import FavoritesOption from "./FavoriteOption";

//server action to retrieve the airport information.
async function GetAirportInfo({
  airportCode,
}: {
  airportCode: string;
}): Promise<AirportInfoType> {
  let res = await fetch(`http://localhost:3000/api/airport/${airportCode}`);
  const airportInfo: AirportInfoType = await res.json();

  return airportInfo;
}

//component to be rendered and passed to UI
export default async function AirportInfo({
  airportCode,
}: {
  airportCode: string;
}) {
  //does not render until airport info is returned
  const airportInfo: AirportInfoType = await GetAirportInfo({ airportCode });

  return (
    <div className="p-8  rounded-lg mb-4 text-center">
      <div className="flow-root align-baseline">
        <p className=" float-left text-5xl font-bold text-white">
          {airportInfo.name}
        </p>
        <div className="float-right px-5">
          <FavoritesOption airportCode={airportCode} />
        </div>
      </div>
      <label id="ident">
        <strong>Identifier:</strong> {airportInfo.ident}
      </label>
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
