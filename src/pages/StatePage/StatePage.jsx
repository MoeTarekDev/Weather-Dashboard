import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { APIKEY } from "../../_lib/data-service";
import Temperature from "../../Components/Temperature/Temperature";
import axios from "axios";
import SevenDayForecast from "../../Components/SevenDayForecast/SevenDayForecast";
import HeatIndex from "../../Components/HeatIndex/HeatIndex";
import Sunset from "../../Components/Sunset/Sunset";
import Wind from "../../Components/Wind/Wind";
import DailyForecast from "../../Components/DailyForecast/DailyForecast";
import UvIndex from "../../Components/UvIndex/UvIndex";
import Precipitation from "../../Components/Precipitation/Precipitation";
import FeelsLike from "../../Components/FeelsLike/FeelsLike";
import Humidity from "../../Components/Humidity/Humidity";
import Visibility from "../../Components/Visibility/Visibility";
import Pressure from "../../Components/Pressure/Pressure";
import { ChevronRight } from "lucide-react";
import MapParent from "../../Components/MapParent/MapParent";
import Skeleton from "../../Components/Skeleton/Skeleton";
import Error from "../Error/Error";

export default function StatePage() {
  let { state } = useParams();
  let [cityData, setCityData] = useState(null);
  let [cityCoordinates, setCityCoordinates] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState(null);
  async function getCityWeather(state) {
    const options = {
      method: "GET",
      url: `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${APIKEY}&q=${state}&format=json&num_of_days=7&tp=3`,
    };
    let { data } = await axios.request(options);
    return data;
  }

  async function getCityCoordinates(state) {
    const options = {
      method: "GET",
      url: `https://api.worldweatheronline.com/premium/v1/search.ashx?key=${APIKEY}&q=${state}&format=json`,
    };
    let { data } = await axios.request(options);
    return data.search_api.result[0];
  }

  async function fetchData() {
    try {
      setIsLoading(true);
      const [weatherData, coordinatesData] = await Promise.all([
        getCityWeather(state),
        getCityCoordinates(state),
      ]);

      setCityData(weatherData);
      setCityCoordinates(coordinatesData);

      console.log(weatherData, coordinatesData);
    } catch (error) {
      setError(`Looks like ${state} city is not available in the used API`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [state]);
  if (error) return <Error error={error} errorButtonText="Try another city" />;
  return (
    <>
      <>
        <div className="pb-4 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
            {!isLoading ? (
              <Temperature cityData={cityData} cityName={state} />
            ) : (
              <Skeleton className="rounded-lg h-full" numOfLines={0} />
            )}
            {!isLoading ? (
              <SevenDayForecast cityData={cityData} cityName={state} />
            ) : (
              <Skeleton className="rounded-lg h-full" numOfLines={0} />
            )}
          </div>
          <div className="flex flex-col h-fit w-full">
            <div className="instruments grid h-full gap-4 col-span-full sm:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
              <HeatIndex
                isLoading={isLoading}
                heatIndex={Number(
                  cityData?.data?.weather[0].hourly[4].HeatIndexC
                )}
              />

              <Sunset
                isLoading={isLoading}
                sunsetTime={cityData?.data?.weather[0].astronomy[0].sunset}
                sunriseTime={cityData?.data?.weather[0].astronomy[0].sunrise}
              />
              <Wind
                isLoading={isLoading}
                windDir={cityData?.data?.weather[0].hourly[4].winddirDegree}
                windSpeed={cityData?.data?.weather[0].hourly[4].windspeedMiles}
              />
              {!isLoading ? (
                <DailyForecast cityData={cityData} />
              ) : (
                <Skeleton className=" h-[12rem] rounded-lg col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2" />
              )}

              <UvIndex
                isLoading={isLoading}
                uvIndexMax={cityData?.data?.weather[0].uvIndex}
              />
              <Precipitation
                isLoading={isLoading}
                precipMM={cityData?.data?.weather[0].hourly[4].precipMM}
              />
              <FeelsLike
                isLoading={isLoading}
                feelsLike={cityData?.data?.weather[0].hourly[4].FeelsLikeC}
                minTemp={cityData?.data?.weather[0].mintempC}
                maxTemp={cityData?.data?.weather[0].maxtempC}
                avgTemp={cityData?.data?.weather[0].avgtempC}
              />
              <Humidity
                isLoading={isLoading}
                humidity={cityData?.data?.weather[0].hourly[4].humidity}
              />
              <Visibility
                isLoading={isLoading}
                visibility={
                  cityData?.data?.weather[0].hourly[4].visibilityMiles
                }
              />
              <Pressure
                isLoading={isLoading}
                pressure={cityData?.data?.weather[0].hourly[4].pressure}
              />
              {!isLoading ? (
                <MapParent
                  lat={Number(cityCoordinates?.latitude)}
                  lon={Number(cityCoordinates?.longitude)}
                />
              ) : (
                <Skeleton
                  className="md:col-span-2 lg:col-span-full h-[23rem] rounded-lg"
                  numOfLines={0}
                />
              )}
            </div>
          </div>
        </div>

        <Link
          to={`/stats/${state}`}
          className={`block mx-auto w-fit mb-7 text-textColor p-2 border-newBoxesBorder border bg-newBoxesColor rounded-md hover:bg-inputHoverColor transition-colors duration-200 `}
        >
          <ChevronRight className="size-5" />
        </Link>
      </>
    </>
  );
}
