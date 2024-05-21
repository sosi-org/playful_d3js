import { useEffect } from 'react';
import * as d3 from 'd3';


const default_data1 = [
  { civilization: "Ancient Egypt", start: -3100, end: -30, region: "Africa", color: "#1f77b4" },
  { civilization: "Roman Empire", start: -27, end: 476, region: "Europe", color: "#ff7f0e" },
  // Add more data as needed
];
const default_data0 = [];

const Timeline = ({ data = default_data0, width = 960, height = 1000, margin = { top: 30, right: 30, bottom: 30, left: 30 } }) => {
  useEffect(() => {

    var margin = ({top: 30, right: 30, bottom: 30, left: 30});


    const svg = d3
      .select("#timeline")
      .attr("width", width)
      .attr("height", height);
      //todo:
      // svg{font: 11px sans-serif;}

    // const regions = d3.nest().key(d=>d.region).entries(data).map(d=>d.key);
    // const regions = d3.nest().key(d=>d.timeline).entries(data).map(d=>d.key);
    // const dataByTimeline = d3.nest().key(d=>d.timeline).entries(data);
    // const dataByRegion = d3.nest().key(d=>d.region).entries(data);
    const dataByTimeline = d3.group(data, d=>d.timeline);
    const dataByRegion = d3.group(data, d=>d.region);
    // const regions = dataByTimeline.map(d=>d.region);
    const regions = Array.from(dataByRegion.keys());

    const x = d3.scaleLinear()
      .domain([d3.min(data, d => d.start), d3.max(data, d => d.end)])
      // .range([margin.left, width - margin.right]);
      .range([0, width - margin.left - margin.right])
      ;

    const y = d3.scaleBand()
      .domain(d3.range(data.length))
      // .range([margin.top, height - margin.bottom])
      // .range([0, width - margin.left - margin.right])
      .range([0, height - margin.bottom - margin.top])
      .padding(0.2);

    var createTooltip = function(el) {
        el
          .style("position", "absolute")
          .style("pointer-events", "none")
          .style("top", 0)
          .style("opacity", 0)
          .style("background", "white")
          .style("border-radius", "5px")
          .style("box-shadow", "0 0 10px rgba(0,0,0,.25)")
          .style("padding", "10px")
          .style("line-height", "1.3")
          .style("font", "11px sans-serif")
      };

    // const color = d3.scaleOrdinal(d3.schemeSet2);
    // var infer_color = d3.scaleOrdinal(d3.schemeSet2).domain(regions);
    const infer_color = d3.scaleOrdinal(d3.schemeSet2);
    // what is this? ^

    const formatDate = d => d < 0 ? `${-d}BC` : `${d}AD`;

    var axisBottom = d3.axisBottom(x)
      .tickPadding(2)
      .tickFormat(formatDate);


    var axisTop = d3.axisTop(x)
      .tickPadding(2)
      .tickFormat(formatDate);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      //.call(d3.axisBottom(x).tickFormat(formatDate));
      .call(axisBottom);

    svg.append("g")
      .attr("transform", `translate(0,${margin.top})`)
      // .call(d3.axisTop(x).tickFormat(formatDate));
      .call(axisTop);

    const bars = svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", (d, i) => `translate(0,${y(i)})`)
      ;

    bars
       .style("cursor", "pointer")
       ;
       // el.style("cursor", "pointer")

    bars.append("rect")
      .attr("x", d => x(d.start))  // sx
      .attr("width", d => x(d.end) - x(d.start))  // w
      .attr("height", y.bandwidth())
      //.attr("fill", infer_color(d)) //d => color(d.color)) // color(d.region)) // .attr("fill", d.color);
      // .attr("fill", d => d.color)
      .attr("fill", d => infer_color(d))
      .append("title")  // ? tooltip?  // text or title?
      .text(d => d.civilization)
      ;

      const __sx = (d) => x(d.start);
      const __w = (d) => x(d.end) - x(d.start);

    const isLabelRight = d => {
      const sx = __sx(d);
      const w = __w(d);
      return (sx > width / 2 ? sx + w < width : sx - w > 0);
    };
    const isLabelRight_x = d => {
      const sx = __sx(d);
      const w = __w(d);
      const isLabelRight_ = isLabelRight(d);
      return isLabelRight_ ? sx - 5 : sx + w + 5;
    };
    bars.append("text")
      .text(d => d.civilization)
      // .attr("x", d => (x(d.end) - x(d.start)) / 2 + x(d.start))
      .attr("x", (d) => isLabelRight_x(d))
      .attr("y", y.bandwidth() / 2)  // 2.5
      .attr("dy", ".35em")
      // .attr("text-anchor", "middle")  // isLabelRight ? "end" : "start"
      .style("text-anchor", (d) => { return isLabelRight(d) ? "end" : "start"; })
      .attr("fill", "black")
      .style("dominant-baseline", "hanging")
      ;

  },
  // useEffect
  [data, width, height, margin]);

  // // svg{font: 11px sans-serif;}
  return (
    // react fragment: <> to avoid unnecessary DOMs
    <>
      <h1>Log-scale World History Timeline</h1>
      <svg id="timeline"></svg>
    </>
  );
};

export default Timeline;
