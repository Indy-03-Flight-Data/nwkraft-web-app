"use server";

import { Weather, WeatherLocation, AirportInfo as AirportInfoType } from "@/app/_lib/definitions";

async function fetchAirportCoordinates(airportCode: string): Promise<{ latitude: number; longitude: number }> {
    const res = await fetch(`http://localhost:3000/api/airport/${airportCode}`);
    const airportInfo: AirportInfoType = await res.json();
    return {
      latitude: airportInfo.latitude_deg,
      longitude: airportInfo.longitude_deg,
    };
}

export async function GetWeather({
    airportCode, hourly,
}: WeatherLocation): Promise<Weather[]> {
    let { latitude, longitude } = await fetchAirportCoordinates(airportCode);
    let res = await fetch(
    //`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourly},surface_pressure,geopotential_height_1000hPa&temperature_unit=fahrenheit&wind_speed_unit=ms&precipitation_unit=inch&forecast_days=1`,
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourly},precipitation_probability,precipitation,surface_pressure,cloud_cover,visibility,wind_speed_10m,geopotential_height_1000hPa&temperature_unit=fahrenheit&wind_speed_unit=ms&precipitation_unit=inch&forecast_days=1`,
    {
      method: "GET",
    }
  );

  console.log("Fetched Weather");
  let weather = await res.json();

  let hour = weather.hourly;

  let weather_items: Weather[] = [];

  let dataLength = hour.time.length;

  //grabs each notam's properties for specific airport
  //adds to notams_items array to be returned as a prop
  for (let i = 0; i < dataLength; i++) {
    let weather_data: Weather = {
        time: hour.time[i],
        temperature: hour.temperature_2m[i],
        surfacePressure: hour.surface_pressure[i],
        hPaHeight1000: hour.geopotential_height_1000hPa[i],
        precipitationChance: hour.precipitation_probability[i],
        precipitationActual: hour.precipitation[i],
        cloudCover: hour.cloud_cover[i],
        visibility: parseFloat((hour.visibility[i] / 5280).toFixed(3)), // Converts from ft to miles
        windSpeed10: hour.wind_speed_10m[i],
    };
    weather_items.push(weather_data);
  }

  return weather_items as Weather[];
}

