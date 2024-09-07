import { useEffect, useState } from "react";
import { getDayOfWeek, getIcon } from "../../_lib/data-service.jsx";
import { navigation } from "../../utilities/Icons.jsx";
export default function Temperature({ cityData, cityName }) {
  function getCurrentTime() {
    const now = new Date();

    // Extract hours, minutes, and seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Add leading zeros if necessary
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Combine into HH:MM:SS format
    return `${hours}:${minutes}:${seconds}`;
  }
  let [time, setTime] = useState(getCurrentTime());
  const { data } = cityData;
  const weatherCondition = data.current_condition[0].weatherDesc[0].value;
  useEffect(() => {
    setTime(getCurrentTime());
  }, []);
  return (
    <div
      className="pt-6 pb-5 px-4 border border-newBoxesBorder rounded-lg flex flex-col 
      justify-between shadow-sm text-textColor bg-newBoxesColor"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">
          {getDayOfWeek(data.weather[0].date)}
        </span>
        <span className="font-medium">{time}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{cityName}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">
        {data.current_condition[0].temp_C}°
      </p>

      <div>
        <div>
          <span>{getIcon(weatherCondition)}</span>
          <p className="pt-2 capitalize text-lg font-medium line-clamp-1">
            {data.current_condition[0].weatherDesc[0].value}
          </p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {data.weather[0].mintempC}°</span>
          <span>High: {data.weather[0].maxtempC}°</span>
        </p>
      </div>
    </div>
  );
}
