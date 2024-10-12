import Notams from "@/app/components/results/get-notams";

type AirportCode = {
  airportCode: string;
};

export default async function Result({airportCode}: AirportCode) {

  return (
    <Notams airportCode={airportCode}/>
  );
}