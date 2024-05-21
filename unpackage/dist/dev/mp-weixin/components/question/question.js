"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "questionnaire",
  data() {
    return {
      questions: [
        {
          value: "USA",
          name: "美国",
          checked: "true"
        },
        {
          value: "CHN",
          name: "中国"
        },
        {
          value: "BRA",
          name: "巴西"
        },
        {
          value: "JPN",
          name: "日本"
        },
        {
          value: "ENG",
          name: "英国"
        },
        {
          value: "FRA",
          name: "法国"
        }
      ],
      current: 0
    };
  },
  props: {
    questions: []
  },
  methods: {
    radioChange: function(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.detail.value) {
          this.current = i;
          break;
        }
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.questions, (item, index, i0) => {
      return {
        a: item.value,
        b: index === $data.current,
        c: common_vendor.t(item.name),
        d: item.value
      };
    }),
    b: common_vendor.o((...args) => $options.radioChange && $options.radioChange(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/codes/CollegeApartmentsFrontE/components/question/question.vue"]]);
wx.createComponent(Component);
