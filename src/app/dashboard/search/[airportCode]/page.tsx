import Checklist from "@/app/components/search/checklist";
import Autocomplete from "@/app/components/search/autocomplete";
import AirportInfo from "@/app/components/common/airport-info";
import { SubmitData } from "@/app/components/search/submit-data";

export default async function Search({
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
      <div className="flex flex-col p-5 m-9 bg-neutral-200 rounded-2xl">
        <div className="grid justify-items-center">
          <Autocomplete />
        </div>
        <form className="" action={SubmitData}>
          <div className="grow">
            <AirportInfo airportCode={airportCode} />
            <Checklist {...{ airportCode, showOptions: true }} />
            <div className="grid justify-items-center">
              <input
                type="submit"
                value="submit"
                className="rounded-full py-2 px-4 font-bold hover:text-green-700 bg-white text-black"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
