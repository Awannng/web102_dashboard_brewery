import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const Charts = () => {
  const [state, setState] = useState([]);
  const [types, setTypes] = useState([]);

  //   fetch the meta data of breweries
  useEffect(() => {
    const fetchData = async () => {
      const repsone = await fetch(
        "https://api.openbrewerydb.org/v1/breweries/meta"
      );
      const data = await repsone.json();

      //   change the format of the data to an array of objects
      const chartData = Object.entries(data.by_state).map(([state, count]) => ({
        state,
        count,
      }));

      const typeData = Object.entries(data.by_type).map(([type, count]) => ({
        type,
        count,
      }));

      setState(chartData.slice(0, 10));
      setTypes(typeData);
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Bar chart for the state counts for breweries */}
      <BarChart
        width={500}
        height={300}
        data={state}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="state" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="count"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>

      <div style={{marginTop:'20px'}}></div>
      
      {/* Line chart for the count of each type of brewery */}
      <LineChart
        width={500}
        height={250}
        data={types}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </>
  );
};

export default Charts;
