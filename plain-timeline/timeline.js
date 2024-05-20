document.addEventListener("DOMContentLoaded", function() {
   const margin = { top: 30, right: 30, bottom: 30, left: 30 };
   const width = 960;
   const height = 1000;

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

   const tooltip = d3.select("#tooltip");

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
       .on("mouseover", function(event, d) {
           tooltip.style("opacity", 1)
               .html(`<b>${d.civilization}</b><br/><b style="color:${d.color}">${d.region}</b><br/>${formatDate(d.start)} - ${formatDate(d.end)}`)
               .style("left", `${event.pageX + 5}px`)
               .style("top", `${event.pageY + 5}px`);
       })
       .on("mousemove", function(event) {
           tooltip.style("left", `${event.pageX + 5}px`)
               .style("top", `${event.pageY + 5}px`);
       })
       .on("mouseout", function() {
           tooltip.style("opacity", 0);
       });

   bars.append("text")
       .text(d => d.civilization)
       .attr("x", d => (x(d.end) - x(d.start)) / 2 + x(d.start))
       .attr("y", y.bandwidth() / 2)
       .attr("dy", ".35em")
       .attr("text-anchor", "middle")
       .attr("fill", "black");
});

