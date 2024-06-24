import WeatherChart from "@/components/WeatherChart.vue";
import { shallowMount } from "@vue/test-utils";

describe("WeatherChart.vue", () => {
  it("renderiza corretamente com dados de previsão", () => {
    const chartData = [
      { dt_txt: "2024-06-01 12:00:00", main: { temp: 25 } },
      { dt_txt: "2024-06-02 12:00:00", main: { temp: 27 } },
      { dt_txt: "2024-06-03 12:00:00", main: { temp: 26 } },
    ];

    const wrapper = shallowMount(WeatherChart, {
      propsData: { chartData },
    });

    expect(wrapper.find(".weather-chart").exists()).toBe(true);

    const chartComponent = wrapper.findComponent({ name: "apexchart" });
    expect(chartComponent.exists()).toBe(true);

    expect(wrapper.vm.$data.series[0].data).toEqual(["25.0", "27.0", "26.0"]);
    expect(wrapper.vm.$data.chartOptions.xaxis.categories).toEqual([
      "2024-06-01 12:00:00",
      "2024-06-02 12:00:00",
      "2024-06-03 12:00:00",
    ]);
  });
});
