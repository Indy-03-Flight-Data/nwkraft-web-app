"use client";

import { GetNotams } from "@/app/components/results/get-notams";
import { useRouter } from "next/navigation";

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
  let router = useRouter();
  let resultsWanted: ResultsWanted = rawFormData;
  console.log(rawFormData);
  if (!(resultsWanted.NOTAMs === "on")) {
    let airportCode = resultsWanted.ident;
    let notams = await GetNotams({ airportCode });
  }
}
