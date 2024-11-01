"use server";

import { Weather, WeatherLocation } from "@/app/_lib/definitions";

export async function GetWeather({
    latitude, longitude, hourly,
}: WeatherLocation): Promise<Weather[]> {
  let res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourly},surface_pressure,geopotential_height_1000hPa`,
    //`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.42&hourly=temperature_2m,surface_pressure,geopotential_height_1000hPa`,
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
    };
    weather_items.push(weather_data);
  }

  return weather_items as Weather[];
}

