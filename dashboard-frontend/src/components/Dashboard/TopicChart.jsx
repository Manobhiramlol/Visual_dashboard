import React, { useState, useEffect } from "react";
import { PolarArea } from "react-chartjs-2";
import { Box, Heading, useColorMode } from "@chakra-ui/react";

const TopicsPolarAreaChart = () => {
  const { colorMode } = useColorMode();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/filtered-data") // Updated Flask API Endpoint
      .then((response) => response.json())
      .then((data) => {
        updateChartData(data);
      });
  }, []);

  const updateChartData = (data) => {
    const topicsData = {};

    data.forEach((entry) => {
      if (entry.topic) {
        if (!topicsData[entry.topic]) {
          topicsData[entry.topic] = 0;
        }
        topicsData[entry.topic] += entry.relevance;
      }
    });

    const topicLabels = Object.keys(topicsData);
    const topicRelevance = Object.values(topicsData);

    setChartData({
      labels: topicLabels,
      datasets: [
        {
          data: topicRelevance,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 205, 86, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 159, 64, 1)",
            "rgb(254, 197, 64)",
            "rgb(11, 143, 230)",
            "rgb(150, 128, 194)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <Box p={6} shadow="md" bg={colorMode === "light" ? "white" : "gray.800"} m={50} borderRadius={20}>
      <Heading as="h2" mb={4} textAlign="left">
        Topics Chart
      </Heading>
      {chartData && <PolarArea data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />}
    </Box>
  );
};

export default TopicsPolarAreaChart;
