import Link from "next/link";

import Autocomplete from "../components/search/autocomplete";

export default function Page() {
  return (
    <div>
      <div className="grid justify-items-center m-52">
        <Autocomplete/>
      </div>
      <div></div>
    </div>
  );
}
