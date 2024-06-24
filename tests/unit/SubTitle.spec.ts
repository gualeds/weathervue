import SubTitle from "@/components/SubTitle.vue";
import { shallowMount } from "@vue/test-utils";

describe("SubTitle.vue", () => {
  it("renderiza corretamente com as props", () => {
    const subtitle = "Test Subtitle";
    const wrapper = shallowMount(SubTitle, {
      propsData: { subtitle },
    });

    expect(wrapper.find(".subtitle").text()).toBe(subtitle);
  });
});
