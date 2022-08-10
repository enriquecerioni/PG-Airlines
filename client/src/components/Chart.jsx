import React from 'react'
import style from './styles/Sales.module.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Sales Chart',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
}

const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

function Chart({ total, tickets_sold}) {

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Sale',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [...total],
        yAxisID: 'y',
      },
      {
        label: 'Tickets sold',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        data: [...tickets_sold],
        yAxisID: 'y1',
      },
    ]
  }  

  return (
    <div className={style.chart_container}>
        <Line options={options} data={data} />
    </div>
    )
}

export default Chart