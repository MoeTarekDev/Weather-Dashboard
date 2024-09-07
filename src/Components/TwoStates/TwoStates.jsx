import { Wind } from "lucide-react";
import { Link } from "react-router-dom";
import useFeatures from "../../Context/features.context";
import useCountryWeather from "../../Hooks/useCountryWeather";
import Skeleton from "./../Skeleton/Skeleton";

export default function TwoStates() {
  let { firstState, secondsState, countryIsoCode, homeDefaultState } =
    useFeatures();
  let { firstStateData, secondStateData, statesData } = useCountryWeather(
    firstState,
    secondsState,
    countryIsoCode,
    homeDefaultState
  );

  if (!firstStateData || !secondStateData || !statesData) {
    return (
      <>
        <Skeleton
          className="lg:min-w-[246px] lg:max-w-[310px] lg:h-[90px] lg:py-3 rounded-xl"
          numOfLines={3}
        />
        <Skeleton
          className="lg:min-w-[246px] lg:max-w-[310px] lg:h-[90px] lg:py-3 rounded-xl"
          numOfLines={3}
        />
      </>
    );
  }

  const firstWeatherData =
    firstStateData?.data?.data?.weather?.[0]?.hourly?.[
      firstStateData?.data?.data?.weather?.[0]?.hourly?.length - 1
    ];
  const secondWeatherData =
    secondStateData?.data?.data?.weather?.[0]?.hourly?.[
      secondStateData?.data?.data?.weather?.[0]?.hourly?.length - 1
    ];

  if (!firstWeatherData || !secondWeatherData) {
    return (
      <>
        {statesData?.data
          .filter((state, index) => index < 3)
          .map((state, index) => (
            <Link
              to={`/${state.name}`}
              key={state.id}
              className="bg-newBoxesColor border border-newBoxesBorder p-4 flex flex-col lg:min-w-[246px] lg:max-w-[310px] cursor-pointer hover:bg-inputHoverColor transition-colors duration-200  text-textColor rounded-xl"
            >
              <span className="text-lg font-medium line-clamp-1">
                {state.name}
              </span>
            </Link>
          ))}
      </>
    );
  }

  return (
    <>
      {statesData &&
        firstStateData &&
        secondStateData &&
        statesData?.data
          .filter((state, index) => index < 2)
          .map((state, index) => (
            <Link
              to={`/${state.name}`}
              key={state.id}
              className="bg-newBoxesColor border border-newBoxesBorder p-4 flex flex-col lg:min-w-[246px] lg:max-w-[310px] cursor-pointer hover:bg-inputHoverColor transition-colors duration-200  text-textColor rounded-xl"
            >
              <span className="text-lg font-medium line-clamp-1">
                {state.name}
              </span>

              <div className="flex flex-col lg:flex-row-reverse lg:justify-between lg:items-center">
                <div className="flex items-center lg:w-fit lg:self-end justify-between">
                  <div className="relative text-xl ">
                    <span className="font-medium">
                      {index === 0
                        ? firstWeatherData.tempC
                        : secondWeatherData.tempC}
                    </span>
                    <span>°</span>
                  </div>
                  <div className="flex lg:hidden items-center gap-1 text-sm">
                    <Wind className="w-7" />

                    <span>
                      {index === 0
                        ? firstWeatherData.windspeedMiles
                        : secondWeatherData.windspeedMiles}{" "}
                      mph
                    </span>
                  </div>
                </div>
                <span className="block text-textColorBahet lg:mt-1 lg:w-fit font-semibold ">
                  {index === 0
                    ? firstWeatherData.weatherDesc[0]?.value
                    : secondWeatherData.weatherDesc[0]?.value}
                </span>
              </div>

              <span className=" inline-block lg:hidden text-textColorBahet font-semibold">
                Feels like{" "}
                {index === 0
                  ? firstWeatherData.FeelsLikeC
                  : secondWeatherData.FeelsLikeC}
                <span>°</span>
              </span>
            </Link>
          ))}
    </>
  );
}
