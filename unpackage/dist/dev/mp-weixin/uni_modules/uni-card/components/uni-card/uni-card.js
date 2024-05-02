"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      plans: [
        {
          name: "目标",
          count_time: "什么时候开始",
          //要进到.vue文件
          pagePath: "../../pages/myself/myself"
        },
        {
          name: "计划二",
          count_time: "什么时候开始",
          pagePath: "../../pages/myself/myself"
        },
        {
          name: "计划三",
          count_time: "什么时候开始",
          pagePath: "../../../../pages/myself"
        }
      ]
    };
  },
  name: "UniCard",
  emits: ["click"],
  props: {
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    padding: {
      type: String,
      default: "10px"
    },
    margin: {
      type: String,
      default: "15px"
    },
    spacing: {
      type: String,
      default: "0 10px"
    },
    extra: {
      type: String,
      default: ""
    },
    cover: {
      type: String,
      default: ""
    },
    thumbnail: {
      type: String,
      default: ""
    },
    isFull: {
      // 内容区域是否通栏
      type: Boolean,
      default: false
    },
    isShadow: {
      // 是否开启阴影
      type: Boolean,
      default: true
    },
    shadow: {
      type: String,
      default: "0px 0px 3px 1px rgba(0, 0, 0, 0.08)"
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClick(type) {
      this.$emit("click", type);
    },
    //点击那个计划进行跳转
    onItemClick(plan) {
      common_vendor.index.reLaunch({
        url: plan.pagePath
      });
    }
  },
  onLoad() {
    this.plans = [
      {
        name: "目标",
        count_time: "什么时候开始",
        pagePath: "../../../../pages/myself"
      },
      {
        name: "计划二",
        count_time: "什么时候开始",
        pagePath: "../../../../pages/myself"
      },
      {
        name: "计划三",
        count_time: "什么时候开始",
        pagePath: "../../../../pages/myself"
      }
    ];
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.cover
  }, $props.cover ? {
    b: common_vendor.o(($event) => $options.onClick("cover")),
    c: $props.cover
  } : {}, {
    d: $props.title || $props.extra
  }, $props.title || $props.extra ? common_vendor.e({
    e: $props.thumbnail
  }, $props.thumbnail ? {
    f: $props.thumbnail
  } : {}, {
    g: common_vendor.t($props.title),
    h: $props.title && $props.subTitle
  }, $props.title && $props.subTitle ? {
    i: common_vendor.t($props.subTitle)
  } : {}, {
    j: common_vendor.o(($event) => $options.onClick("title")),
    k: common_vendor.t($props.extra),
    l: common_vendor.o(($event) => $options.onClick("extra"))
  }) : {}, {
    m: common_vendor.f($data.plans, (plan, index, i0) => {
      return {
        a: common_vendor.t(plan.name),
        b: index,
        c: common_vendor.o(($event) => $options.onItemClick(plan), index)
      };
    }),
    n: $props.padding,
    o: $props.isFull ? 1 : "",
    p: $props.isShadow ? 1 : "",
    q: $props.border ? 1 : "",
    r: $props.isFull ? 0 : $props.margin,
    s: $props.spacing,
    t: $props.isShadow ? $props.shadow : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/lenovo/Desktop/智慧社区/CollegeApartmentsMiniProgramFrontEnd/uni_modules/uni-card/components/uni-card/uni-card.vue"]]);
wx.createComponent(Component);
