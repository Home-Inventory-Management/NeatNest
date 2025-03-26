import React, { useEffect, useRef } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement, 
  LineElement,  
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement, 
  LineElement   
);

const ConsumptionGraphs = () => {
    const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  const topConsumedData = {
    labels: ['Panadol', 'Onion', 'Suger', 'Milk', 'Tomato'],
    datasets: [
      {
        label: 'Top 5 Consumed Items',
        data: [30, 50, 40, 60, 80],
        backgroundColor: 'rgba(35, 190, 82, 0.87)',
        borderColor: 'rgb(10, 68, 28)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(39, 176, 96, 0.85)',
      },
    ],
  };

  const monthlyUsageData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Stock Usage Trend',
        data: [100, 200, 150, 250, 300],
        fill: false,
        borderColor: 'rgb(21, 157, 87)',
        tension: 0.1,
        hoverBorderColor: 'rgb(10, 175, 93)',
      },
    ],
  };

  const stockCategoryData = {
    labels: ['Electronics', 'Furniture', 'Clothing', 'Groceries'],
    datasets: [
      {
        label: 'Stock Category Breakdown',
        data: [40, 20, 25, 15],
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFC300'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    animation: {
      duration: 1000,
      easing: 'easeOutBounce',
    },
  };

  useEffect(() => {
    const destroyChart = (chartRef) => {
      if (chartRef.current) {
        const chartInstance = chartRef.current.chartInstance;
        if (chartInstance) {
          chartInstance.destroy();
        }
      }
    };

    destroyChart(barChartRef);
    destroyChart(lineChartRef);
    destroyChart(pieChartRef);

    return () => {
      destroyChart(barChartRef);
      destroyChart(lineChartRef);
      destroyChart(pieChartRef);
    };
  }, [topConsumedData, monthlyUsageData, stockCategoryData]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-10 relative">
      <div className="absolute inset-0 opacity-30 blur-3xl"></div>
      <div className="absolute top-20 left-20 w-60 h-60 bg-green-400 opacity-20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-600 opacity-20 rounded-full blur-3xl"></div>

      <h2 className="text-4xl font-extrabold text-green-900 text-center drop-shadow-lg mb-12m,n  oo9im     b7nvv767y">
        Interactive Consumption Graphs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl z-10">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white border-opacity-30">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Top 5 Consumed Items</h3>
          <Bar ref={barChartRef} data={topConsumedData} options={options} />
        </div>

        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white border-opacity-30">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Monthly Stock Usage Trends</h3>
          <Line ref={lineChartRef} data={monthlyUsageData} options={options} />
        </div>

        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white border-opacity-30">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Stock Category Breakdown</h3>
          <Pie ref={pieChartRef} data={stockCategoryData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ConsumptionGraphs