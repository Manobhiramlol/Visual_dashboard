import React from "react";
import { Radar } from "react-chartjs-2";
import { Box, useColorModeValue, Heading } from "@chakra-ui/react";

const LikelihoodRadarChart = ({ data = [] }) => {
  // ✅ Move hooks to the top so they always execute
  const backgroundColor = useColorModeValue("rgb(116, 240, 249)", "rgba(2, 188, 255, 0.7)");
  const borderColor = useColorModeValue("rgb(249, 98, 98)", "rgba(2, 255, 213, 0.7)");
  const pointBackgroundColor = useColorModeValue("white", "black");
  const pointBorderColor = useColorModeValue("rgb(213, 248, 144)", "rgb(255, 247, 98)");
  const boxBgColor = useColorModeValue("white", "gray.800");

  // ✅ Return fallback UI only AFTER hooks
  if (!Array.isArray(data) || data.length === 0) {
    return <Heading as="h3" textAlign="center">No data available</Heading>;
  }

  const chartData = {
    labels: data.map((entry) => entry?.country || "Unknown"),
    datasets: [
      {
        label: "Likelihood",
        data: data.map((entry) => entry?.likelihood || 0),
        backgroundColor,
        borderColor,
        borderWidth: 2,
        pointBackgroundColor,
        pointBorderColor,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {  
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 5,
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Box
      borderRadius={20}
      pt={6}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      shadow="md"
      pb={100}
      bg={boxBgColor}
      maxHeight={700} 
      overflow="hidden"
    >
      <Heading as="h2" mb={4} ml={6}>
        Likelihood Chart
      </Heading>
      <Radar data={chartData} options={chartOptions} />
    </Box>
  );
};

export default LikelihoodRadarChart;
