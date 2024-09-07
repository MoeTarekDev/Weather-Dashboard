import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import useFeatures from "../Context/features.context";
import { APIKEY } from "../_lib/data-service";

export default function useCountryWeather() {
  const { homeDefaultState, countryIsoCode, firstState, secondsState } =
    useFeatures();

  const getCountryData = async () => {
    const options = {
      method: "GET",
      url: `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${APIKEY}&q=${homeDefaultState}&format=json&num_of_days=7&tp=3`,
    };
    return axios.request(options);
  };

  const getStatesByCountryName = async () => {
    const key = "bzZuZXFndlhRalNWUXB4eVVKNmttNnhkbG9RTElCT25WTkpEdm0zVA==";
    const options = {
      method: "GET",
      url: `https://api.countrystatecity.in/v1/countries/${countryIsoCode}/states`,
      headers: {
        "X-CSCAPI-KEY": key,
      },
    };
    return axios.request(options);
  };

  const getFirstStateData = async () => {
    const options = {
      method: "GET",
      url: `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${APIKEY}&q=${firstState}&format=json&num_of_days=7&tp=3`,
    };
    return axios.request(options);
  };
  const getSecondStateData = async () => {
    const options = {
      method: "GET",
      url: `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${APIKEY}&q=${secondsState}&format=json&num_of_days=7&tp=3`,
    };
    return axios.request(options);
  };
  const [countryQuery, statesQuery, firstStateQuery, secondStateQuery] =
    useQueries({
      queries: [
        {
          queryKey: ["country", homeDefaultState],
          queryFn: getCountryData,
          enabled: !!homeDefaultState,
        },
        {
          queryKey: ["states", countryIsoCode],
          queryFn: getStatesByCountryName,
          enabled: !!countryIsoCode,
        },
        {
          queryKey: ["firstState", firstState],
          queryFn: getFirstStateData,
          enabled: !!firstState,
        },
        {
          queryKey: ["secondState", secondsState],
          queryFn: getSecondStateData,
          enabled: !!secondsState,
        },
      ],
    });

  const data = countryQuery.data;
  const countryError = countryQuery.error;
  const statesData = statesQuery.data;
  const firstStateData = firstStateQuery.data;
  const secondStateData = secondStateQuery.data;

  return {
    data,
    statesData,
    firstStateData,
    secondStateData,
    countryError,
  };
}
