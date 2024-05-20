import { useEffect } from 'react';
import * as d3 from 'd3';


const default_data1 = [
  { civilization: "Ancient Egypt", start: -3100, end: -30, region: "Africa", color: "#1f77b4" },
  { civilization: "Roman Empire", start: -27, end: 476, region: "Europe", color: "#ff7f0e" },
  // Add more data as needed
];
const default_data0 = [];

const Timeline = ({ data = default_data1, width = 960, height = 1000, margin = { top: 30, right: 30, bottom: 30, left: 30 } }) => {
  useEffect(() => {
    const svg = d3.select("#timeline")
      .attr("width", width)
      .attr("height", height);

    const x = d3.scaleLinear()
      .domain([d3.min(data, d => d.start), d3.max(data, d => d.end)])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.top, height - margin.bottom])
      .padding(0.2);

    const color = d3.scaleOrdinal(d3.schemeSet2);

    const formatDate = d => d < 0 ? `${-d}BC` : `${d}AD`;

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(formatDate));

    svg.append("g")
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x).tickFormat(formatDate));

    const bars = svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", (d, i) => `translate(0,${y(i)})`);

    bars.append("rect")
      .attr("x", d => x(d.start))
      .attr("width", d => x(d.end) - x(d.start))
      .attr("height", y.bandwidth())
      .attr("fill", d => color(d.region))
      .append("title")
      .text(d => d.civilization);

    bars.append("text")
      .text(d => d.civilization)
      .attr("x", d => (x(d.end) - x(d.start)) / 2 + x(d.start))
      .attr("y", y.bandwidth() / 2)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("fill", "black");

  },
  // useEffect
  [data, width, height, margin]);

  return (
    // react fragment: <> to avoid unnecessary DOMs
    <>
      <h1>Log-scale World History Timeline</h1>
      <svg id="timeline"></svg>
    </>
  );
};

export default Timeline;
