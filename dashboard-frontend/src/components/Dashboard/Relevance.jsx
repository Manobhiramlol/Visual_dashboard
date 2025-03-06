import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';

const RelevanceBubbleChart = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Relevance',
        data: data.map(item => ({
          x: item.likelihood,
          y: item.impact,
          r: item.relevance * 5, // Adjusting bubble size
        })),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Intensity',
        data: data.map(item => ({
          x: item.likelihood,
          y: item.impact,
          r: item.intensity,
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Likelihood',
          font: { size: 14, weight: 'bold' },
        },
        grid: { color: 'rgba(200, 200, 200, 0.3)' },
      },
      y: {
        title: {
          display: true,
          text: 'Impact',
          font: { size: 14, weight: 'bold' },
        },
        grid: { color: 'rgba(200, 200, 200, 0.3)' },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = chartData.datasets[tooltipItem.datasetIndex];
            return `${dataset.label}: (${tooltipItem.raw.x}, ${tooltipItem.raw.y})`;
          },
        },
      },
    },
  };

  return (
    <Box 
      p={6} 
      borderRadius="12px" 
      boxShadow="lg" 
      bg="white"
      textAlign="center"
      height="500px"
    >
      <Heading as="h2" size="lg" mb={4} color="gray.700">
        Relevance & Intensity Chart
      </Heading>
      <Bubble data={chartData} options={chartOptions} />
    </Box>
  );
};

export default RelevanceBubbleChart;
