import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Timeline from './Timeline';

const TimelineContainer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv("/civilizations-timeline.csv").then(parsedData => {
      const formattedData = parsedData.map(d => ({
        ...d,
        start: +d.start,
        end: +d.end
      }));
      setData(formattedData);
    });
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <Timeline data={data} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default TimelineContainer;
