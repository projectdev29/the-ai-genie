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
import { Card } from "@shopify/polaris";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  element: {
    bar: {
      borderRadius: 10,
      barWidth: 10,
    },
  },

  scales: {
    barPercentage: 0.2,

    xAxes: [
      {
        barThickness: 10,
      },
    ],
    x: {
      ticks: {
        color: "rgba(255, 255, 255, 0.5)",
      },

      grid: {
        display: false,
      },
    },
  },

  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Total 15 Products",
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
        backgroundColor: ["#008080", "#008080", "#008080", "#008080"],
        hoverBackgroundColor: "#325AE7",
        barPercentage: 0.1,
        categorySpacing: 2,
        data: [10, 30, 65, 60, 40],
        borderRadius: 20,
      },
    ],
  };

  return (
    <Card sectioned>
      <Bar height={200} width={400} options={options} data={data} />
    </Card>
  );
}
