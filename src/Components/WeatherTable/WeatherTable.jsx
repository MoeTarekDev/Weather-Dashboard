import { useMemo, useState } from "react";

export default function WeatherTable({ weatherData }) {
  const data = useMemo(() => weatherData.weather || [], []);

  console.log(data);

  const bodyRows = data.map((day) => {
    return {
      date: day.date,
      avgtempC: day.avgtempC,
      mintempC: day.mintempC,
      maxtempC: day.maxtempC,
      feelLike: day.hourly[4].FeelsLikeC,
      pressure: day.hourly[4].pressure,
      humidity: day.hourly[4].humidity,
      uvIndex: day.hourly[4].uvIndex,
    };
  });
  console.log(bodyRows);
  let [filteredItems, setFilterItems] = useState(data);
  let [selectedFilter, setSelectedFilter] = useState("Last 30 days");
  let [isFilterOpen, setIsFilterOpen] = useState(false);
  function handleFilterChange(e) {
    setIsFilterOpen((prev) => !prev);

    setSelectedFilter(e.target.innerHTML);
    if (e.target.innerHTML === "Last 30 days") {
      setFilterItems(data);
    }
    if (e.target.innerHTML === "Last 20 days") {
      const x = data.slice(-20);

      setFilterItems(x);
    }
    if (e.target.innerHTML === "Last 10 days") {
      const y = data.slice(-10);

      setFilterItems(y);
    }
    if (e.target.innerHTML === "Last day") {
      const z = data.slice(-1);

      setFilterItems(z);
    }
  }
  return (
    <div className="relative overflow-x-auto  custom-scrollbar shadow-md sm:rounded-lg">
      {/* Filter Start */}
      <div
        className={` mb-5 relative bg-inputColor   ${
          isFilterOpen ? "rounded-tl-md rounded-tr-md" : "rounded-md"
        }  w-[164px]`}
      >
        <button
          onClick={() => {
            setIsFilterOpen((prev) => !prev);
          }}
          id="dropdownRadioButton"
          data-dropdown-toggle="dropdownRadio"
          className="inline-flex items-center text-textColor hover:bg-newBoxesBorder w-full rounded-md py-1 px-3  "
          type="button"
        >
          <svg
            className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
          </svg>
          {selectedFilter}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          className={`absolute  ${
            isFilterOpen ? "block" : "hidden"
          } top-full left-0 right-0`}
        >
          <ul
            className=" py-1 space-y-1 text-sm rounded-br-md bg-inputColor"
            aria-labelledby="dropdownRadioButton"
          >
            <li
              onClick={(e) => {
                handleFilterChange(e);
              }}
              className="py-2 hover:bg-newBoxesBorder rounded-md px-3 cursor-pointer"
            >
              Last day
            </li>
            <li
              onClick={(e) => {
                handleFilterChange(e);
              }}
              className="py-2 hover:bg-newBoxesBorder rounded-md px-3 cursor-pointer"
            >
              Last 10 days
            </li>
            <li
              onClick={(e) => {
                handleFilterChange(e);
              }}
              className="py-2 hover:bg-newBoxesBorder rounded-md px-3 cursor-pointer"
            >
              Last 20 days
            </li>
            <li
              onClick={(e) => {
                handleFilterChange(e);
              }}
              className="py-2 hover:bg-newBoxesBorder rounded-md px-3 cursor-pointer"
            >
              Last 30 days
            </li>
          </ul>
        </div>
      </div>
      {/* Filter end */}
      <table className="w-full text-sm  text-left rtl:text-right text-textColor border border-newBoxesBorder">
        {/* Table Head Start */}
        <thead className="text-xs text-gray-700 uppercase bg-myPrimary">
          <tr>
            <th className="px-6 py-3 text-center">Date</th>
            <th className="px-6 py-3 text-center">Average Temp</th>
            <th className="px-6 py-3 text-center">Minimum Temp</th>
            <th className="px-6 py-3 text-center">Maximum Temp</th>
            <th className="px-6 py-3 text-center">Felt Like</th>
            <th className="px-6 py-3 text-center">Pressure</th>
            <th className="px-6 py-3 text-center">Humidity</th>
            <th className="px-6 py-3 text-center">UV Index</th>
          </tr>
        </thead>
        {/* Table Head End */}

        <tbody>
          {/* Data rows */}
          {filteredItems.map((row, index) => (
            <tr
              key={index}
              className="border-b border-newBoxesBorder hover:bg-inputHoverColor "
            >
              <td className="py-4 px-6 text-center">
                {bodyRows.filter((x) => x.date === row.date)[0 ?? index].date}
              </td>
              <td className="py-4 text-center">
                {
                  bodyRows.filter((x) => x.date === row.date)[0 ?? index]
                    .avgtempC
                }
              </td>
              <td className="py-4 text-center">
                {
                  bodyRows.filter((x) => x.date === row.date)[0 ?? index]
                    .mintempC
                }
              </td>
              <td className="py-4 text-center">
                {
                  bodyRows.filter((x) => x.date === row.date)[0 ?? index]
                    .maxtempC
                }
              </td>
              <td className="py-4 text-center">
                {
                  bodyRows.filter((x) => x.date === row.date)[0 ?? index]
                    .feelLike
                }
              </td>
              <td className="py-4 text-center">
                {
                  bodyRows.filter((x) => x.date === row.date)[0 ?? index]
                    .pressure
                }
              </td>
              <td className="py-4 text-center">
                {
                  bodyRows.filter((x) => x.date === row.date)[0 ?? index]
                    .humidity
                }
              </td>
              <td className="py-4 text-center">
                {
                  bodyRows.filter((x) => x.date === row.date)[0 ?? index]
                    .uvIndex
                }
              </td>
            </tr>
          ))}
          {/* More data rows */}
        </tbody>
      </table>
    </div>
  );
}
