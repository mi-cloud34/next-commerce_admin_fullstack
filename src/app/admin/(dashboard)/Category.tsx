"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// ArcElement'i kaydediyoruz
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductCategoryChart = () => {
  const data = {
    labels: ["Elektronik", "Giyim", "Mobilya", "Kitap"],
    datasets: [
      {
        label: "Kategori Dağılımı",
        data: [12, 19, 3, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default ProductCategoryChart;
