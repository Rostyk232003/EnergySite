import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function AnalyticsChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/analytics/data.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Downloading data...</div>;

  const barData = {
    labels: data.energyUsage.map((d) => d.month),
    datasets: [
      {
        label: 'Usage (kWh)',
        data: data.energyUsage.map((d) => d.value),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: data.costs.map((d) => d.month),
    datasets: [
      {
        label: 'Cost (UAH)',
        data: data.costs.map((d) => d.value),
        borderColor: 'rgba(255, 99, 132, 0.8)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ display: 'flex', gap: 32, justifyContent: 'center', padding: 24 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 style={{ textAlign: 'center' }}>Energy Usage by Month</h2>
        <Bar data={barData} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 style={{ textAlign: 'center' }}>Energy Cost by Month</h2>
        <Line data={lineData} />
      </div>
    </div>
  );
}
