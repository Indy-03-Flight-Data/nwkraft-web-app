import Accordion from "@/app/components/common/accordion";
import AirportInfo from "@/app/components/common/airport-info";

// Define props type for NwkraftChecklist, showOptions allow checkboxes to show for form.
type NwkraftChecklistProps = {
  showOptions: boolean;
};

export default async function Checklist({
  showOptions,
}: NwkraftChecklistProps) {
  const nwkraft = [
    {
      id: 1,
      acronym: "NOTAMs",
      description:
        "Notices to Air Missions: Important notifications issued to pilots about changes in conditions, such as runway closures or airspace restrictions.",
    },
    {
      id: 2,
      acronym: "Weather",
      description:
        "Includes current and forecasted weather information crucial for safe flight planning, such as wind, visibility, and storms.",
    },
    {
      id: 3,
      acronym: "Known ATC Delays",
      description:
        "Known Air Traffic Control Delays: Information about current and expected delays caused by air traffic control, often due to congestion or weather.",
    },
    {
      id: 4,
      acronym: "Runway Lengths",
      description:
        "Data on the lengths of available runways at the destination and alternate airports to ensure aircraft can safely take off and land.",
    },
    {
      id: 5,
      acronym: "Alternate Routes",
      description:
        "Pre-planned routes that pilots can use if the primary route becomes unavailable, ensuring flexibility and safety during the flight.",
    },
    {
      id: 6,
      acronym: "Fuel",
      description:
        "Information on fuel requirements, including how much fuel is needed for the flight and where refueling options are available if necessary.",
    },
    {
      id: 7,
      acronym: "Takeoff and landing distances",
      description:
        "Measurements required for an aircraft to safely take off and land under current conditions, including weight and weather factors.",
    },
  ];


  return (
    <>
      
      {/* NWKRAFT checklist section */}
      <div className="flex p-6">
        <ul className="grow text-left">
          {nwkraft.map((item) => (
            <li className="grow p-2 m-2 bg-gray-400 rounded-lg" key={item.id}>
              <Accordion
                title={item.acronym}
                content={item.description}
                showOptions={showOptions}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
