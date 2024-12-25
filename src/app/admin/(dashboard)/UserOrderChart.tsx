"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Category scale'i kaydet
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserOrderChart = () => {
  const data = {
    labels: ["Ocak", "Şubat", "Mart", "Nisan"],
    datasets: [
      {
        label: "Yeni Kullanıcılar",
        data: [10, 20, 30, 40],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  return <Line data={data} />;
};

export default UserOrderChart;
