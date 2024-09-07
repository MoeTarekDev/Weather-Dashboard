import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
export default function AreaChart({ weatherData }) {
  const test = weatherData?.weather?.map((day, index) => {
    return { date: day.date, avgtempC: Number(day.avgtempC) };
  });
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      const svg = svgRef.current;
      if (svg) {
        setDimensions({
          width: svg.parentElement.clientWidth,
          height: svg.parentElement.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Ensure the data is mapped for the whole month (day by day)
    const data = test.map((d) => ({
      date: new Date(d.date), // convert to a Date object
      avgtempC: +d.avgtempC, // ensure temperature is numeric
    }));
    const { width, height } = dimensions;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    // Create scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.avgtempC) - 5,
        d3.max(data, (d) => d.avgtempC) + 5,
      ])
      .range([height - margin.bottom, margin.top]);

    // Create area generator with smoothing curve
    const area = d3
      .area()
      .x((d) => xScale(d.date))
      .y0(height - margin.bottom)
      .y1((d) => yScale(d.avgtempC))
      .curve(d3.curveMonotoneX);

    // Select the SVG and clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);

    // Blue gradient for the area fill
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "temp-gradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#80dfff") // light blue at the top
      .attr("stop-opacity", 0.8);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#0066ff") // deeper blue at the bottom
      .attr("stop-opacity", 0.2);

    // Draw the area with the blue gradient
    svg
      .append("path")
      .datum(data)
      .attr("fill", "url(#temp-gradient)")
      .attr("stroke", "#005bb5")
      .attr("stroke-width", 2)
      .attr("d", area);

    // Draw X axis (Date) with limited ticks
    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("class", "x-axis")
      .call(
        d3
          .axisBottom(xScale)
          .ticks(6) // limit to 6 ticks
          .tickFormat(d3.timeFormat("%b %d"))
      );

    // Draw Y axis (Temperature)
    const yAxis = svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));

    // Custom styling for the axes
    svg.selectAll("text").attr("fill", "#333").attr("font-size", "12px");
    svg.selectAll("line").attr("stroke", "#ccc");
    svg.selectAll("path.domain").attr("stroke", "#ccc");
  }, [weatherData, dimensions]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}
