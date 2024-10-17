
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
      <div className="flex flex-grow items-center justify-items-center">
        <Autocomplete />
      </div>
      <div>
        <AirportInfo airportCode={airportCode} />
      </div>
      <DynamicAirportForm airportCode={airportCode}>
        <NotamsResults airportCode={airportCode} />
      </DynamicAirportForm>
    </>
  );
}
