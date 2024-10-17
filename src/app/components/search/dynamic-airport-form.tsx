"use client";

import Checklist from "@/app/components/search/checklist";
import { useState, useEffect, Children } from "react";

export default function DynamicAirportForm({
  airportCode,
  children,
}: {
  airportCode: string;
  children: React.ReactNode;
}) {
  const [showResults, setShowReults] = useState(false);

  const handleSubmit = () => {;
    setShowReults(true);
  };

  return (
    <>

        <form className="" action={handleSubmit}>
          <div className="grid justify-items-center">
            <input type="hidden" id="ident" name="ident" value={airportCode} />
            <div className="">
              <Checklist showOptions={true} />
            </div>
            <input
              type="submit"
              value="submit"
              className="grid rounded-full py-2 px-4 font-bold hover:text-green-700 bg-white text-black hover:cursor-pointer"
            />
          </div>
        </form>

      {showResults && children}
    </>
  );
}
