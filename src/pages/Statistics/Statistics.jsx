import { Link, useParams } from "react-router-dom";
import { APIKEY } from "../../_lib/data-service";
import { useEffect, useState } from "react";
import axios from "axios";
import AreaChart from "../../Components/AreaChart/AreaChart";
import Tooltip from "../../Components/Tooltip/Tooltip";
import HumidityAndWindChart from "../../Components/HumidityAndWindChart/HumidityAndWindChart";
import WeatherTable from "../../Components/WeatherTable/WeatherTable";
import { ChevronLeft } from "lucide-react";

export default function Statistics() {
  let { state } = useParams();
  let [historicalData, setHistoricalData] = useState(null);
  async function getHistoricalData(state) {
    const options = {
      method: "GET",
      url: `https://api.worldweatheronline.com/premium/v1/past-weather.ashx?Key=${APIKEY}&q=${state}&date=2024-08-05&enddate=2024-09-05&format=json`,
    };
    let { data } = await axios.request(options);
    console.log(data.data);
    setHistoricalData(data.data);
  }

  useEffect(() => {
    getHistoricalData(state);
  }, [state]);
  return (
    <>
      {historicalData ? (
        <div className="text-white grid grid-cols-2 space-y-7 lg:space-y-0 py-7 lg:gap-5 bg-mainBg">
          <div className="border border-newBoxesBorder lg:col-span-1 col-span-2 flex flex-col gap-3 w-full rounded-lg text-textColor bg-newBoxesColor">
            <Tooltip
              title={"Area chart"}
              content={
                "This chart is showing the variation of temperature over time (1 Month)"
              }
            />
            <AreaChart weatherData={historicalData} />
          </div>

          <div className="border border-newBoxesBorder lg:col-span-1 col-span-2 flex flex-col justify-between gap-3 w-full rounded-lg text-textColor bg-newBoxesColor p-5">
            <Tooltip
              title={"Bar Chart"}
              content={
                "This chart is showing the variation between Humidity and Heat Index over time (1 Month)"
              }
            />

            <HumidityAndWindChart weatherData={historicalData} />
          </div>
          <div className="border border-newBoxesBorder  col-span-2 flex flex-col justify-between gap-3 w-full rounded-lg text-textColor bg-newBoxesColor p-5">
            <WeatherTable weatherData={historicalData} />
          </div>

          <Link
            to={`/${state}`}
            className={`block mx-auto col-span-2 mb-7 text-textColor p-2 border-newBoxesBorder border bg-newBoxesColor rounded-md hover:bg-inputHoverColor transition-colors duration-200 `}
          >
            <ChevronLeft className="size-5" />
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
