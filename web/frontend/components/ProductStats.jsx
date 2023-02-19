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
import { Card, Text, Stack } from "@shopify/polaris";

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
      // borderRadius: 10,
      barWidth: 10,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        callback: function (value, index, values) {
          return value % 2 === 0 ? value : "";
        },
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
      display: false,
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
        label: "Products",
        backgroundColor: ["#008080", "#008080", "#008080", "#008080"],
        hoverBackgroundColor: "#325AE7",
        barPercentage: 0.1,
        categorySpacing: 2,
        data: [3, 4, 2, 6],
        borderWidth: 2,
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  };

  return (
    <Stack>
      <Card>
        <Text variant="bodyMd" as="span" color="subdued" alignment="end">
          Total 15 Products
        </Text>
        <div style={{ height: 280, minWidth: 520 }}>
          <Bar height={280} width={520} options={options} data={data} />
        </div>
      </Card>
    </Stack>
  );
}
