"use server";

import { GetNotams } from "@/app/components/results/get-notams";
import { stringify } from "querystring";

type ResultsWanted = {
  ident?: string;
  NOTAMs?: string;
  Weather?: string;
  "Known ATC Delays"?: string;
  "Runway Lengths"?: string;
  "Alternate Routes"?: string;
  Fuel?: string;
  "Takeoff and landing distances"?: string;
};

type AirportCode = {
  airportCode: String;
};
//data sent from client to server in airport checklist
export async function SubmitData(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  let resultsWanted: ResultsWanted = rawFormData;

  if (!(resultsWanted.ident === null)) {
    let airportCode = resultsWanted.ident;
    let notams = await GetNotams({ airportCode });
    console.log(notams);
  }
}
