<template>
  <div class="weather-chart">
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "WeatherChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      series: [
        {
          name: "Temperatura (°C)",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          toolbar: {
            show: true,
          },
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [],
        },
        colors: ["#008FFB"],
        fill: {
          colors: ["#00E396"],
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
      },
    };
  },
  watch: {
    chartData: {
      handler(newData) {
        console.log("New data received:", newData);
        if (newData && newData.length > 0) {
          this.series[0].data = newData.map((item) =>
            item.main.temp.toFixed(1)
          );
          this.chartOptions.xaxis.categories = newData.map(
            (item) => item.dt_txt
          );
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.weather-chart {
  width: 100%;
  height: 400px;
}
</style>
