import React, { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TagsContext from "./TagsContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

const labels = [
  "Not Yet Started",
  "Reviewed",
  "In Progress",
  "Saved For Later",
];

export default function ProductStats() {
  const tagsContext = useContext(TagsContext);
  let mapData = [0, 0, 0, 0];
  for (let i = 0; i < labels.length; i++) {
    let key = labels[i];
    if (tagsContext.tagsMap[key]) {
      mapData[i] = tagsContext.tagsMap[key].split(",").length;
    }
  }
  mapData[0] = tagsContext.productCount - mapData[1] - mapData[2] - mapData[3];

  const data = {
    labels,
    datasets: [
      {
        label: "Products",
        data: mapData,
        backgroundColor: "rgba(93, 174, 199, 1)",
      },
    ],
  };

  return <Bar height={200} width={400} options={options} data={data} />;
}
