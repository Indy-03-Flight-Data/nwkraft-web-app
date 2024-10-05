"use client";

import Checklist from "../../components/search/checklist";
import Autocomplete from "../../components/search/autocomplete";

export default function Search() {
  const nwkraftProp = {
    showOptions: true,
  };

  return (
    <>
      <div className="flex flex-col p-5 m-9 bg-neutral-200 rounded-2xl">
        <form className="" action="">
          <div className="grow">
            <div className="grid justify-items-center">
              <Autocomplete />
            </div>
            <Checklist airportInfo={{
              elevation_ft: 0,
              ident: "",
              name: "",
              type: "",
              latitude_deg: 0,
              longitude_deg: 0,
              municipality: "",
              iso_region: ""
            }} {...nwkraftProp} />
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
