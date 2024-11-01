"use server";

import { GetWeather } from "@/app/_actions/get-weather";
import { WeatherLocation } from "@/app/_lib/definitions";

export default async function WeatherResults({ airportCode, hourly }: WeatherLocation) {
  const weather = await GetWeather({ airportCode, hourly });
  return (
    <div>
      {weather.map((hourly) => (
        <div key={hourly.time} className="bg-zinc-800 p-5 m-5">
          <p>Time: {hourly.time}</p>
          <p>Temperature: {hourly.temperature}</p>
          <p>Surface Pressure: {hourly.surfacePressure}</p>
          <p>Height at 1000hPa: {hourly.hPaHeight1000}</p>
        </div>
      ))}
    </div>
  );
}
