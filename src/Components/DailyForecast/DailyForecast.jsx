import { useEffect } from "react";
import Swiper from "swiper";
import { getIcon, timeTransform } from "../../_lib/data-service";

export default function DailyForecast({ cityData }) {
  const labels = cityData.data.weather[0].hourly
    .map((x) => x.time)
    .map((word) => (word.length === 3 ? word.slice(0, 1) : word.slice(0, 2)))
    .map((hour) => timeTransform[hour]);

  useEffect(() => {
    new Swiper(".swiper-container", {
      slidesPerView: 6,

      mousewheel: {
        forceToAxis: true,
      },
    });
  }, []);
  return (
    <div
      className="py-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 overflow-hidden
     shadow-sm col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 bg-newBoxesColor border-newBoxesBorder text-textColor"
    >
      <div className=" swiper-container h-full overflow-hidden cursor-grab ">
        <div className="swiper-wrapper h-full flex gap-10 ">
          {cityData.data.weather[0].hourly.map((day, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center swiper-slide"
            >
              <span className="text-sm text-center">{labels[index]}</span>
              <span>{getIcon(day.weatherDesc[0].value)}</span>
              <span>{day.tempC}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
