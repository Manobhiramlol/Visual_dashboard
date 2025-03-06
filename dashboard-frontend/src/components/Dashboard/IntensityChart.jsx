import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

// ✅ Register Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Function to generate a random date between Dec 6, 2016, and Jan 17, 2017
const getRandomDate = () => {
  const start = new Date("2016-12-06");
  const end = new Date("2017-01-17");
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).getFullYear(); // Extract the year
};

const IntensityChart = ({ data = [] }) => {
  // ✅ Move useColorModeValue outside JSX
  const bgColor = useColorModeValue("white", "gray.800");

  // ✅ Handle empty or undefined data
  if (!data || data.length === 0) {
    return <Heading as="h3" textAlign="center">No data available</Heading>;
  }

  // ✅ Extract & Handle missing values
  let processedData = data.map((item) => ({
    intensity: item.intensity || 0,
    year: item.start_year || getRandomDate(), // Assign random year if missing
  }));

  // ✅ Sort data in ascending order based on years
  processedData.sort((a, b) => a.year - b.year);

  // Extract values for chart
  const intensityData = processedData.map((item) => item.intensity);
  const years = processedData.map((item) => String(item.year));

  const getColor = (value) => {
    const colors = ["#7F00FF", "#F2B93B", "#FF8000", "#FF453A"];
    const maxIntensity = Math.max(...intensityData) || 1; // Prevent divide by zero
    const threshold = maxIntensity / 4;

    if (value < threshold) return colors[0];
    else if (value < threshold * 2) return colors[1];
    else if (value < threshold * 3) return colors[2];
    else return colors[3];
  };

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Intensity",
        backgroundColor: intensityData.map((value) => getColor(value)),
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: intensityData,
      },
    ],
  };

  const chartOptions = {
    layout: {
      padding: 20,
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "white",
        borderWidth: 1,
        cornerRadius: 5,
        displayColors: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "start",
        offset: -20,
        font: {
          size: 14,
          weight: "bold",
        },
        formatter: (value) => value + "%",
        shadowBlur: 10,
        shadowColor: "white",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: "Roboto", size: 14, weight: "bold" },
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          font: { family: "Roboto", size: 14, weight: "bold" },
          callback: (value) => value + "%",
        },
      },
    },
    animation: {
      duration: 4000,
      easing: "easeInOutQuart",
      mode: "progressive",
    },
  };

  return (
    <Box
      m={10}
      p={5}
      borderRadius="8px"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      bg={bgColor} // ✅ Now using variable instead of calling hook inside JSX
    >
      <Heading as="h2" mb={4}>
        Intensity Chart
      </Heading>
      <Bar data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
    </Box>
  );
};

export default IntensityChart;
