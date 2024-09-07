import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../.scrollbar.css";
import {
  countryToIsoMap,
  getNavBarCityName,
  timeTransform,
} from "../../_lib/data-service";
import ChartTest from "../../Components/Chart/ChartTest";
import LargestPaint from "../../Components/LargestPaint/LargestPaint";
import TwoStates from "../../Components/TwoStates/TwoStates";
import WeekDays from "../../Components/WeekDays/WeekDays";
import useFeatures from "../../Context/features.context";
import useCountryWeather from "../../Hooks/useCountryWeather";
import Error from "../Error/Error";
export default function Home() {
  let modalSmallElement = useRef();
  let modalXElement = useRef();
  let [isModalOpened, setIsModalOpened] = useState(false);
  let {
    homeDefaultState,
    countryIsoCode,
    setCountryIsoCode,
    firstState,
    secondsState,
    setHomeDefaultState,
  } = useFeatures();
  let { data, statesData, countryError, secondStateError } = useCountryWeather(
    homeDefaultState,
    countryIsoCode,
    firstState,
    secondsState
  );

  const labels = data?.data?.data?.weather[0].hourly
    .map((x) => x.time)
    .map((word) => (word.length === 3 ? word.slice(0, 1) : word.slice(0, 2)))
    .map((hour) => timeTransform[hour]);

  const dataSet = data?.data.data.weather[0].hourly.map((w) =>
    Number(w.chanceofrain)
  );
  useEffect(() => {
    const locationRequested = localStorage.getItem("locationRequested");
    if (!locationRequested) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async function (position) {
            const latitude = position.coords.latitude.toFixed(3);
            const longitude = position.coords.longitude.toFixed(3);
            const { country, state } = (
              await getNavBarCityName(latitude, longitude)
            ).data.address;
            console.log(country, state);

            const isoCode = countryToIsoMap[country];

            setHomeDefaultState(state);
            setCountryIsoCode(isoCode);
            localStorage.setItem("locationRequested", "true");
            localStorage.setItem("country", state);
            localStorage.setItem("isoCode", isoCode);

            if (statesData) {
              console.log(statesData);
            }
          },
          function (error) {
            console.log(error);
          }
        );
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalSmallElement.current &&
        !modalSmallElement.current.contains(event.target)
      ) {
        setIsModalOpened(false);
      } else if (
        modalXElement.current &&
        modalXElement.current.contains(event.target)
      ) {
        setIsModalOpened(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (countryError)
    return <Error error={countryError} errorButtonText="Try another country" />;
  return (
    <>
      <>
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:space-y-0">
          <div
            className={`modal-big ${
              isModalOpened ? "block" : "hidden"
            } absolute inset-0 bg-black/40 z-[100]`}
          >
            <div
              ref={modalSmallElement}
              className="modal-small custom-scrollbar overflow-y-auto flex flex-col absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[400px] bg-newBoxesColor p-3 rounded-xl"
            >
              <span
                ref={modalXElement}
                className="self-end bg-textColor text-mainBg p-1 rounded-full cursor-pointer hover:bg-textColorBahet"
              >
                <XMarkIcon className="size-3"></XMarkIcon>
              </span>
              <h4 className="font-semibold text-lg  text-textColor">
                Explore other {homeDefaultState}'s cities
              </h4>
              <ul className="mt-5">
                {statesData?.data
                  .filter((state, index) => index > 2)
                  .map((state, index) => (
                    <li
                      key={state.name}
                      className="p-2 rounded-lg hover:bg-inputHoverColor cursor-pointer"
                    >
                      <Link
                        className="w-full inline-block line-clamp-1 text-textColor "
                        to={`/${state.name}`}
                      >
                        {state.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-9 flex flex-col items-center gap-5">
            <LargestPaint />
            <WeekDays />
          </div>
          <aside className="lg:col-span-3 lg:self-center mt-10 lg:mt-0 flex flex-col gap-8 xl:gap-5 lg:gap-16">
            <div className="flex flex-col gap-3 ">
              <h2 className="text-textColor text-xl font-medium">
                Chance of rain
              </h2>
              <ChartTest labels={labels} dataSet={dataSet} />
            </div>
            <div className=" pb-7 lg:pb-0">
              <div className=" flex items-center justify-between text-textColor">
                <h3 className="text-textColor text-xl inline-block font-medium">
                  Other large cities
                </h3>
                <div
                  onClick={() => {
                    setIsModalOpened(true);
                  }}
                  className="flex items-center gap-1 text-sm text-textColor font-medium cursor-pointer"
                >
                  <span>Show All</span> <ChevronRightIcon className="size-3" />
                </div>
              </div>
              <div className="flex relative flex-col gap-4 mt-3 lg:min-w-[246px] lg:max-w-[310px] lg:h-[246px] lg:gap-7">
                <TwoStates />
              </div>
            </div>
          </aside>
        </div>
      </>
    </>
  );
}
