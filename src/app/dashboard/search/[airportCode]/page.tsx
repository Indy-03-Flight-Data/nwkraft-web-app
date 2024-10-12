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
      <div className="flex flex-col p-5 m-9 bg-zinc-800 rounded-2xl">
        <div className="grid justify-items-center">
          <Autocomplete />
        </div>
        <form className="" action={SubmitData}>
          <div className="grid grid-cols-4">
            <div className="grid col-span-2">
              <AirportInfo airportCode={airportCode} />
            </div>
            <div className="grid col-span-2">
              <Checklist {...{ airportCode, showOptions: true }} />
            </div>
            <input
              type="submit"
              value="submit"
              className="grid col-start-2 col-span-2 rounded-full py-2 px-4 font-bold hover:text-green-700 bg-white text-black hover:cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  );
}
