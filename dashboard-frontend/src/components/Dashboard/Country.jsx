import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Box, Flex, Heading, Select, useColorMode, useColorModeValue } from "@chakra-ui/react";

const CountryChart = () => {
  const { colorMode } = useColorMode();
  const [selectedCountry, setSelectedCountry] = useState("United States of America");
  const [chartData, setChartData] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/filtered-data") // Updated Flask API Endpoint
      .then((response) => response.json())
      .then((data) => {
        setCountries([...new Set(data.map((entry) => entry.country).filter(Boolean))]);
        updateChartData(data, selectedCountry);
      });
  }, [selectedCountry]);

  const updateChartData = (data, country) => {
    const countryData = data.filter((entry) => entry.country === country);
    const sectors = {};

    countryData.forEach((entry) => {
      if (!sectors[entry.sector]) {
        sectors[entry.sector] = 0;
      }
      sectors[entry.sector] += entry.intensity;
    });

    const sectorLabels = Object.keys(sectors);
    const sectorIntensities = Object.values(sectors);

    const chartBackgroundColor = colorMode === "light" ? "rgba(0, 122, 255, 0.7)" : "rgba(10, 132, 255, 0.7)";

    setChartData({
      labels: sectorLabels,
      datasets: [
        {
          label: "Intensity",
          data: sectorIntensities,
          backgroundColor: chartBackgroundColor,
        },
      ],
    });
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box p={6} shadow="md" bg={useColorModeValue("white", "gray.800")} m={50} borderRadius={20}>
      <Flex direction="column">
        <Heading as="h2" textAlign="left" mb={4}>
          Country Chart
        </Heading>
        <Select value={selectedCountry} onChange={handleCountryChange} mb={4} w="250px">
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </Select>
        <Box height="500px" width="100%">
          {chartData && <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />}
        </Box>
      </Flex>
    </Box>
  );
};

export default CountryChart;
