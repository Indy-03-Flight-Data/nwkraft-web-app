import AirportInfo from "@/app/components/common/airport-info";
import NotamsResults from "@/app/components/results/notams-results";
import Autocomplete from "@/app/components/search/autocomplete";
import DynamicAirportForm from "@/app/components/search/dynamic-airport-form";

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
      <div className="grid items-center justify-items-center">
        <Autocomplete />
      </div>
      <div className="flex flex-grow bg-zinc-800 p-5 m-5 rounded-xl">
        <div className="grid grid-cols-2">
          <div>
            <AirportInfo airportCode={airportCode} />
          </div>
          <div>
            <DynamicAirportForm airportCode={airportCode}>
              <NotamsResults airportCode={airportCode} />
            </DynamicAirportForm>
          </div>
        </div>
      </div>
    </>
  );
}
