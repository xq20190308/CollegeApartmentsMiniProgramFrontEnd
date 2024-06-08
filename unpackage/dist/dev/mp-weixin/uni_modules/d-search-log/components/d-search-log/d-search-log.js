"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      search_list_old: [],
      search_input: "",
      is_hot_show: true
    };
  },
  created() {
    this._init_search();
  },
  props: {
    is_show_more: {
      value: Boolean,
      default: true
    },
    search_list_old_man_num: {
      value: Number,
      default: 10
    },
    search_list_hot: {
      value: Array,
      default: []
    },
    //HM修改 定义默认搜索关键词(水印文字)
    placeholder: {
      value: String,
      default: "请输入搜索内容"
    },
    store_key: {
      value: String,
      default: "search_list"
    },
    color_border: {
      value: String,
      default: ""
    },
    color_text: {
      value: String,
      default: "#30c66c"
    },
    search_name: {
      value: String,
      default: "搜索"
    },
    input_text: {
      value: String,
      default: ""
    }
  },
  watch: {
    search_list_hot(newVal) {
      if (newVal) {
        this.search_list_hot = newVal;
      }
    },
    input_text(newVal) {
      if (newVal) {
        this.search_input = newVal;
        this.saveKeyword();
      }
    }
  },
  methods: {
    onClickInput() {
      this.saveKeyword();
    },
    onClickInputValue(search_input) {
      if (!search_input) {
        return false;
      }
      this.search_input = search_input.toLowerCase();
      this.saveKeyword();
    },
    _init_search() {
      var that = this;
      var store_key = that.store_key;
      common_vendor.index.getStorage({
        key: store_key,
        success: (res) => {
          var old_data = JSON.parse(res.data);
          that.search_list_old = old_data;
        }
      });
    },
    saveKeyword() {
      var that = this;
      if (!this.search_input) {
        return false;
      }
      this.search_input = this.search_input.toLowerCase();
      var search_input = this.search_input;
      var store_key = that.store_key;
      common_vendor.index.getStorage({
        key: store_key,
        success: (res) => {
          var old_data = JSON.parse(res.data);
          var findIndex = old_data.indexOf(search_input);
          if (findIndex == -1) {
            old_data.unshift(search_input);
          } else {
            old_data.splice(findIndex, 1);
            old_data.unshift(search_input);
          }
          old_data.length > that.search_list_old_man_num && old_data.pop();
          common_vendor.index.setStorage({
            key: store_key,
            data: JSON.stringify(old_data)
          });
          that.search_list_old = old_data;
        },
        fail: (e) => {
          var old_data = [search_input];
          common_vendor.index.setStorage({
            key: store_key,
            data: JSON.stringify(old_data)
          });
          that.search_list_old = old_data;
        }
      });
      that.$emit("onSearchNameApi", this.search_input);
    },
    onClickDel() {
      this.search_input = "";
      this.$emit("onSearchNameApi", "");
    },
    onClickDelAll() {
      var that = this;
      console.log("---全部删除-log--");
      common_vendor.index.showModal({
        title: "提示",
        content: "确定全部删除",
        success(res) {
          if (res.confirm) {
            common_vendor.index.removeStorageSync(that.store_key);
            that.search_list_old = [];
            that.$emit("onClickDelAllApi", "");
          }
        }
      });
    },
    //
    onClickShowHot() {
      this.is_hot_show = this.is_hot_show == true ? false : true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.placeholder,
    b: common_vendor.o((...args) => $options.onClickInput && $options.onClickInput(...args)),
    c: $data.search_input,
    d: common_vendor.o(($event) => $data.search_input = $event.detail.value),
    e: $data.search_input
  }, $data.search_input ? {
    f: common_vendor.o((...args) => $options.onClickDel && $options.onClickDel(...args))
  } : {}, {
    g: common_vendor.t($props.search_name ? $props.search_name : "搜索"),
    h: common_vendor.o((...args) => $options.onClickInput && $options.onClickInput(...args)),
    i: common_vendor.s("border: 1rpx solid " + $props.color_border + ";color: " + $props.color_text + ";"),
    j: $props.is_show_more
  }, $props.is_show_more ? common_vendor.e({
    k: common_vendor.o((...args) => $options.onClickDelAll && $options.onClickDelAll(...args)),
    l: $data.search_list_old.length == 0
  }, $data.search_list_old.length == 0 ? {} : {}, {
    m: $data.search_list_old.length > 0
  }, $data.search_list_old.length > 0 ? {
    n: common_vendor.f($data.search_list_old, (item, index, i0) => {
      return {
        a: common_vendor.t(item ? item : "无"),
        b: index,
        c: common_vendor.o(($event) => $options.onClickInputValue(item), index)
      };
    })
  } : {}, {
    o: $props.search_list_hot.length > 0
  }, $props.search_list_hot.length > 0 ? {
    p: $data.is_hot_show ? "../../../../static/hygiene/yan_open.png" : "../../../../static/hygiene/yan_close.png",
    q: common_vendor.o((...args) => $options.onClickShowHot && $options.onClickShowHot(...args))
  } : {}, {
    r: $props.search_list_hot.length > 0 && $data.is_hot_show
  }, $props.search_list_hot.length > 0 && $data.is_hot_show ? {
    s: common_vendor.f($props.search_list_hot, (item, index, i0) => {
      return {
        a: common_vendor.t(item ? item : "无"),
        b: index,
        c: common_vendor.o(($event) => $options.onClickInputValue(item), index)
      };
    })
  } : {}) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
