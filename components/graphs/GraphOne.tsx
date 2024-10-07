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
import Papa, { ParseResult } from "papaparse";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the structure of your dataset items
interface DataPoint {
  x: number; // or Date, depending on your usage
  y: number;
}

interface CSVRow {
    time_abs: string;
    velocity: string;
  }

const GraphOne = () => {
  // Use the DataPoint type for the dataset state
  const [dataset, setDataset] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Read the CSV file
    Papa.parse<CSVRow>("/data/test.csv", {
      header: true,
      download: true,
      complete: (results: ParseResult<CSVRow>) => {
        // Transform the CSV data into the format needed for Chart.js
        const data: DataPoint[] = results.data.map((item: CSVRow) => ({
          x: new Date(item.time_abs).getTime(),
          y: parseFloat(item.velocity),
        }));
        setDataset(data);
      },
      error: (error: Error) => {
        console.error("Error reading CSV:", error);
      },
    });
  }, []);

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
        min: dataset.length > 0 ? dataset[0].x : undefined, // Set min to the first timestamp, undefined if empty
        max: dataset.length > 0 ? dataset[dataset.length - 1].x : undefined, // Set max to the last timestamp, undefined if empty
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
