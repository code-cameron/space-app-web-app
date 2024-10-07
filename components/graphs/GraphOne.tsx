"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import Papa from "papaparse";

const GraphOne = () => {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    // Read the CSV file
    Papa.parse("/data/test.csv", {
      header: true,
      download: true,
      complete: (results: any) => {
        // Transform the CSV data into the format needed for Chart.js
        const data = results.data.map((item: any) => ({
          x: new Date(item.time_abs).getTime(),
          y: parseFloat(item.velocity),
        }));
        setDataset(data);
      },
      error: (error: any) => {
        console.error("Error reading CSV:", error);
      },
    });
  }, []);
  // Example dataset with actual timestamps (in milliseconds)


  const data = {
    datasets: [
      {
        label: "Velocity",
        data: dataset,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Velocity over Time",
      },
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "Time",
        },
        min: dataset[0]?.x, // Set min to the first timestamp
        max: dataset[dataset.length - 1]?.x, // Set max to the last timestamp
        ticks: {
          callback: function (value, index, values) {
            // Show only the first and last tick
            if (index === 0 || index === values.length - 1) {
              const date = new Date(value);
              return date.toLocaleTimeString(); // Format as desired
            }
            return ""; // Hide other ticks
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Velocity",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default GraphOne;
