import CityCard from "@/components/CityCard.vue";
import { mount, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

describe("CityCard.vue", () => {
  let vuetify: any;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("renderiza corretamente com as props", () => {
    const temperature = "25";
    const humidity = "80";
    const weatherDescription = "03d";
    const cityName = "São Paulo";
    const stateName = "SP";
    const icon = "03d";
    const latitude = 123.45;
    const longitude = 67.89;
    const goToCityView = jest.fn();

    const wrapper = shallowMount(CityCard, {
      vuetify,
      propsData: {
        temperature,
        humidity,
        weatherDescription,
        cityName,
        stateName,
        icon,
        latitude,
        longitude,
        goToCityView,
      },
    });
    expect(wrapper.find(".temperature").text()).toBe(`${temperature}°C`);

    const subinfoElements = wrapper.findAll(".subinfo");
    expect(subinfoElements.at(0)!.text()).toContain(`${humidity}%`);
    expect(subinfoElements.at(0)!.text()).toContain("Nuvens dispersas");
    expect(subinfoElements.at(1)!.text()).toContain(
      `${cityName}, ${stateName}`
    );
  });

  it("chama o evento go-to-city-view com a latitude e a longitude quando se clica no botão", async () => {
    const temperature = "25";
    const humidity = "80";
    const weatherDescription = "03d";
    const cityName = "São Paulo";
    const stateName = "SP";
    const icon = "03d";
    const latitude = 123.45;
    const longitude = 67.89;
    const goToCityView = jest.fn();

    const wrapper = mount(CityCard, {
      vuetify,
      propsData: {
        temperature,
        humidity,
        weatherDescription,
        cityName,
        stateName,
        icon,
        latitude,
        longitude,
        goToCityView,
      },
    });

    const button = wrapper.find(".btn");
    if (button.exists()) {
      await button.trigger("click");

      expect(wrapper.emitted("go-to-city-view")).toBeTruthy();
      expect(wrapper.emitted("go-to-city-view")![0]).toEqual([
        { latitude, longitude },
      ]);
    } else {
      throw new Error("Button not found");
    }
  });
});
