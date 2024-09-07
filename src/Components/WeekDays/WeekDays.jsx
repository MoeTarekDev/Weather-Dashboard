import { Wind } from "lucide-react";
import useCountryWeather from "../../Hooks/useCountryWeather";
import {
  formattedTodayDate,
  transferToSmallDateName,
} from "../../_lib/data-service";
export default function WeekDays() {
  let { data } = useCountryWeather();
  const formattedDate = formattedTodayDate();
  return (
    <>
      <div className="flex flex-col md:mt-2 mt-7 md:max-h-[180px] md:max-w-[738px] w-full  md:w-fit md:flex-row gap-3 text-textColor">
        {data?.data?.data?.weather.map((day, index) => (
          <div
            key={index}
            className={`rounded-lg  ${
              index === 0
                ? " border-4 md:border-2 border-zinc-300"
                : " border border-zinc-500 md:border-0"
            } p-3 flex  flex-col items-start  md:items-center md:gap-1`}
          >
            <span className="font-semibold">
              {data.data.data.weather[index].date === formattedDate
                ? "Today"
                : transferToSmallDateName(data.data.data.weather[index].date)}
            </span>
            <div className=" w-full md:w-fit flex items-center justify-between text-2xl">
              <div>
                <span className="font-medium relative">
                  {
                    data?.data?.data?.weather[index].hourly[
                      data.data.data.weather[index].hourly.length - 1
                    ].tempC
                  }
                  <span>°</span>
                </span>
              </div>
              <div className="flex md:hidden items-center gap-1 text-sm">
                <Wind className="w-7" />

                <span>
                  {
                    data?.data?.data?.weather[index].hourly[
                      data.data.data.weather[index].hourly.length - 1
                    ].windspeedMiles
                  }{" "}
                  mph
                </span>
              </div>
            </div>
            <span className="text-textColorBahet line-clamp-2 font-semibold text-center">
              {
                data?.data?.data?.weather[index].hourly[
                  data.data.data.weather[index].hourly.length - 1
                ].weatherDesc[0].value
              }
            </span>
            <span className=" inline-block md:hidden text-textColorBahet font-semibold">
              Feels like{" "}
              {
                data?.data?.data?.weather[index].hourly[
                  data.data.data.weather[index].hourly.length - 1
                ].FeelsLikeC
              }
              <span>°</span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
