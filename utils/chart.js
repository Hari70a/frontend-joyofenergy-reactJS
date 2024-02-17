import * as chartJs from "chart.js";

let chart;

export const formatDateLabel = (timestamp, identifier, position) => {
  const date = new Date(timestamp);
  const month = date.getMonth();
  const day = date.getDate();
  
  const formatPart = (value) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  return identifier === "LAST-24-HOURS" ? `${formatPart(position)}` : `${formatPart(day)}/${formatPart(month + 1)}`;
};

export const renderChart = (containerId, readings, identifier) => {
  chartJs.Chart.defaults.font.size = "10px";

  chartJs.Chart.register.apply(
    null,
    Object.values(chartJs).filter((chartClass) => chartClass.id)
  );

  const labels = readings.map(({ time }, index) => formatDateLabel(time, identifier, index));
  const values = readings.map(({ value }) => value);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "kWh usage",
        data: values,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderWidth: 0.2,
        backgroundColor: "#5A8EDA",
        borderRadius: 10,
      },
    ],
  };

  if (chart) {
    chart.destroy();
  }

  chart = new chartJs.Chart(containerId, {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      maintainAspectRatio: false,
    },
  });
};
