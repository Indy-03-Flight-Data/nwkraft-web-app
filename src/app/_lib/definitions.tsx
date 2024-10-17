export type Acronym = {
  title: string;
  content: string;
  showOptions: boolean;
};

//AirportInfo definition, returned by API/Airport
export type AirportInfo = {
  elevation_ft: number;
  ident: string;
  name: string;
  type: string;
  latitude_deg: number;
  longitude_deg: number;
  municipality: string;
  iso_region: string;
};


//Type to hold information returned by NOTAMs API
export type Notam = {
  id: string;
  effectiveStart: string;
  effectiveEnd: string;
  text: string;
  lastUpdated: string;
};

export type AirportCode = {
  airportCode: string;
};

//data submitted from checklist form
export type ResultsWanted = {
    ident?: string;
    NOTAMs?: string;
    Weather?: string;
    "Known ATC Delays"?: string;
    "Runway Lengths"?: string;
    "Alternate Routes"?: string;
    Fuel?: string;
    "Takeoff and landing distances"?: string;
  };


