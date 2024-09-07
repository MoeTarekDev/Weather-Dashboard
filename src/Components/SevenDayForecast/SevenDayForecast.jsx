import {
  formattedTodayDate,
  getIcon,
  transferToSmallDateName,
} from "../../_lib/data-service";
import { calender } from "../../utilities/Icons";

export default function SevenDayForecast({ cityData, cityName }) {
  let { data } = cityData;
  const formattedDate = formattedTodayDate();
  return (
    <>
      <div
        className="pt-6 pb-5 px-4 flex-1  border rounded-lg flex flex-col
          justify-between dark:bg-dark-grey shadow-sm dark:shadow-none text-textColor bg-newBoxesColor border-newBoxesBorder"
      >
        <div>
          <h2 className="flex items-center gap-2 font-medium">
            {calender} 7-Day Forecast for {cityName}
          </h2>
          <div className="forecast-list pt-3 flex flex-col divide-y-2 divide-zinc-100/30">
            {data.weather.map((day, index) => (
              <div
                key={index}
                className="daily-forecast py-4 flex flex-col justify-evenly"
              >
                <div className="flex-1 flex items-center  justify-between gap-4">
                  <p className="text-xl min-w-[3.5rem]">
                    {data.weather[index].date === formattedDate
                      ? "Today"
                      : transferToSmallDateName(data.weather[index].date)}
                  </p>
                  {getIcon(
                    day.hourly[day.hourly.length - 1].weatherDesc[0].value
                  )}
                  <p className="font-bold">{day.mintempC}°</p>
                  <div className="temperature flex-1 w-full h-2 rounded-lg"></div>
                  <p className="font-bold">{day.maxtempC}°</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
