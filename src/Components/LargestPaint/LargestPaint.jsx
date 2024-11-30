import { Droplets, Wind } from "lucide-react";
import useCountryWeather from "../../Hooks/useCountryWeather";
export default function LargestPaint() {
  let { data } = useCountryWeather();

  return (
    <>
      <div className="flex sm:w-[334px] sm:h-[334px] gap-3 flex-col w-full  sm:flex-row  text-textColor">
        <div className="text-[180px] w-fit self-center relative text-center font-medium">
          <span>
            {data
              ? data?.data?.data?.weather[0].hourly[
                  data.data.data.weather[0].hourly.length - 1
                ].tempC
              : "∞"}
            °
          </span>
          <h1
            className={`${
              data?.data?.data?.weather[0].hourly[0].weatherDesc[0].value.split(
                " "
              ).length > 3
                ? "text-xl max-w-[120px] mx-auto"
                : "text-4xl"
            }  text-center`}
          >
            {data
              ? data?.data?.data?.weather[0].hourly[0].weatherDesc[0].value
              : "Hmmmm"}
          </h1>
        </div>
        <div className="sm:self-end w-full sm:mb-[100px] sm:ps-10 flex flex-col items-center sm:items-start gap-3">
          <div className="flex items-center gap-3">
            <Wind className="w-7" />
            <span>
              {data
                ? data?.data?.data?.weather[0].hourly[
                    data.data.data.weather[0].hourly.length - 1
                  ].windspeedMiles
                : "∞"}
              mph
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Droplets className="w-7" />
            <span>
              {data
                ? data?.data?.data?.weather[0].hourly[
                    data.data.data.weather[0].hourly.length - 1
                  ].humidity
                : "∞"}
              %
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
