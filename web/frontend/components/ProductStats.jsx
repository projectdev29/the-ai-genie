import React, { useContext } from "react";
import { Card, Text, Stack } from "@shopify/polaris";
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
  element: {
    bar: {
      barWidth: 9,
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
  responsive: true,
  plugins: {
    legend: {
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
        backgroundColor: ["#008080", "#008080", "#008080", "#008080"],
        hoverBackgroundColor: "#325AE7",
        barPercentage: 0.1,
        categorySpacing: 2,
        data: [3, 4, 2, 6],
        borderWidth: 0,
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  };

  return (
    <Stack>
      <Card sectioned>
        <Text variant="bodyMd" as="span" color="subdued" alignment="end">
          Total 15 Products
        </Text>
        <div style={{ minHeight: 218, minWidth: 540 }}>
          <Bar height={218} width={540} options={options} data={data} />
        </div>
      </Card>
    </Stack>
  );
}
