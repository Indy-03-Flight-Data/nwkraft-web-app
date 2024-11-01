import AirportInfo from "@/app/components/common/airport-info";
import NotamsResults from "@/app/components/results/notams-results";
import Autocomplete from "@/app/components/search/autocomplete";
import DynamicAirportForm from "@/app/components/search/dynamic-airport-form";
import Link from "next/link";
import Image from "next/image";
import back_arrow from "@/app/public/arrow_back.png";

import WeatherResults from "@/app/components/results/weather-results";

export default function Search({
  params,
}: {
  params: { airportCode: string };
}) {
  const nwkraftProp = {
    showOptions: true,
  };

  const airportCode = params.airportCode;

  return (
    <>
      <div className="m-5">
        <div className="flex justify-items-center p-5">
          <div className="">
            <Link href="/dashboard">
              <Image
                src={back_arrow}
                width={24}
                height={24}
                alt="back button"
              />
            </Link>
          </div>
          <div className="flex-grow justify-items-center">
            <Autocomplete />
          </div>
        </div>
        <div className="flex flex-grow bg-zinc-800 p-5 m-5 rounded-xl">
          <div className="grid grid-cols-2">
            <div>
              <AirportInfo airportCode={airportCode} />
            </div>
            <div>
              <DynamicAirportForm airportCode={airportCode}>
                <NotamsResults airportCode={airportCode} />
                <WeatherResults latitude={52.52}
                longitude={13.42}
                hourly={"temperature_2m"} />
              </DynamicAirportForm>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
