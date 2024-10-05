import NwkraftChecklist from "../../components/search/nwkraft-checklist";
import Searchbar from "../../components/search/searchbar";
import { SubmitData } from "@/app/components/search/submit-data";

export default function Search() {
  const nwkraftProp = {
    showOptions: true,
  };

  return (
    <>
      <div className="flex flex-col p-5 m-9 bg-neutral-200 rounded-2xl">
        <form className="" action={SubmitData}>
          <div className="grid justify-items-center">
            <Searchbar />
            <NwkraftChecklist {...nwkraftProp} />
            <input
              type="submit"
              value="submit"
              className="rounded-full py-2 px-4 font-bold hover:text-green-700 bg-white text-black"
            />
          </div>
        </form>
      </div>
    </>
  );
}
