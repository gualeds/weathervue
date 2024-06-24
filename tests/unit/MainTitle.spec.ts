import MainTitle from "@/components/MainTitle.vue";
import { shallowMount } from "@vue/test-utils";

describe("MainTitle.vue", () => {
  it("renderiza corretamente com as props", () => {
    const title = "Test Title";
    const wrapper = shallowMount(MainTitle, {
      propsData: { title },
    });

    expect(wrapper.find(".title").text()).toBe(title);
  });
});
