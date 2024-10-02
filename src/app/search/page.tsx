import NwkraftChecklist from "../components/search/nwkraft-checklist";
import Searchbar from "../components/search/searchbar";

export default function Search() {
  const nwkraftProp = {
    showOptions: true,
  };

  return (
    <>
      <div className="flex flex-col p-5">
        <Searchbar />
        <NwkraftChecklist />
        <input type="submit" value="submit"></input>
      </div>
    </>
  );
}
