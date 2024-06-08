"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/http.js");
if (!Array) {
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  (_easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2)();
}
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
if (!Math) {
  (_easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table)();
}
const _sfc_main = {
  __name: "showhygiene",
  setup(__props) {
    const tableData = common_vendor.reactive({
      all: [
        { week: "1", grades: "A" },
        { week: "2", grades: "B" }
      ]
    });
    const add = () => {
      common_vendor.index.navigateTo({
        url: "../hygiene/hygieneGradesSubmit"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          width: "150",
          align: "left"
        }),
        b: common_vendor.p({
          width: "150",
          align: "left"
        }),
        c: common_vendor.f(tableData.all, (item, index, i0) => {
          return {
            a: common_vendor.t(item.week),
            b: "6281f6b8-5-" + i0 + "," + ("6281f6b8-4-" + i0),
            c: common_vendor.t(item.grades),
            d: "6281f6b8-6-" + i0 + "," + ("6281f6b8-4-" + i0),
            e: index,
            f: "6281f6b8-4-" + i0 + ",6281f6b8-0"
          };
        }),
        d: common_vendor.p({
          align: "grades"
        }),
        e: common_vendor.sr("table", "6281f6b8-0"),
        f: common_vendor.p({
          border: true,
          stripe: true,
          type: "",
          emptyText: "暂无更多数据"
        }),
        g: common_vendor.o(add)
      };
    };
  }
};
wx.createPage(_sfc_main);
