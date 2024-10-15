// BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data1,header,title}) => {
  const [chartData, setChartData] = useState(null);
  

  useEffect(() => {
    if (data1 && data1.length > 0) {
      const labels = data1.slice(0,6).map((item) => item.period);
      const values = data1.slice(0,6).map((item) => item.v);

      const data = {
        labels,
        datasets: [
          {
            label: header,
            data: values,
            backgroundColor: '#00C000',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
      setChartData(data);
    }
  }, [data1]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title+ ' Financials Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return chartData ? 
  <Bar data={chartData} options={options} /> : <p>Loading chart...</p>;
};

export default BarChart;
