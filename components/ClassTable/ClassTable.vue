<template>
  <!-- 课表组件
  <div class="class-table">
    <div class="table-wrapper">
      <div class="table-container">
        <div class="class-table">
          <div class="thead">
            <div class="tr">
              <div class="th" v-for="(item, index) in classTableData.weeks" :key="index">{{ item ? '周' + item : '' }}</div>
            </div>
          </div>
          <div class="tbody">
            <div class="tr" v-for="(item, index) in classTableData.courses" :key="index">
              <div
                class="td"
                style="font-size:12px;background:#d4f7fd;word-wrap: break-word; 
                  word-break: break-all;"
              >
                {{ changeCharacter(index) }}
              </div>
              <div class="td" v-for="(innerItem, idx) in item" :key="idx" @click="toScanDetail(innerItem, idx)">
                <div v-if="innerItem.lessonsName">
                  {{ innerItem.lessonsName }}
                  <br />
                  {{ innerItem.lessonsTime }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

 
<script>
// //var that;
// //import { Dialog } from "vant";
// export default {
//   props: {
//     classTableData: {
//       type: Object
//     }
//   },
//   computed: {
//     // 将数字转换成汉字
//     changeCharacter(num) {
//       return function(num) {
//         var digArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//         var characterArr = [
//           "一",
//           "二",
//           "三",
//           "四",
//           "五",
//           "六",
//           "七",
//           "八",
//           "九"
//         ];
//         return characterArr[num];
//       };
//     }
//   },
//   methods: {
//     // 查看该课程的相关详情
//     toScanDetail(item, idx) {
//       var con = `<div style="width:180px;text-align:left!important;margin:0 auto;color:#999;font-size:16px">课程名称：${item.lessonsName}<br/>上课时间：${item.lessonsTime}<br/>上课地点：${item.lessonsAddress}<br/>授课老师：${item.lessonsTeacher}<br/>课程课时：${item.lessonsRemark}</div>`;
//       // if (item.lessonsName) {
//       //   Dialog.alert({
//       //     message: con
//       //   });
//       // }
//     }
//   }
// };
</script>
 
<style scoped>
.class-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.thead {
  display: table-header-group;
}

.tr {
  display: table-row;
}

.th {
  display: table-cell;
  text-align: center;
  border: 1px solid #ccc;
  padding: 8px;
  background-color: #f0f0f0;
    height: 50px;
}

.tbody {
  display: table-row-group;
}

.tr .td {
  display: table-cell;
  text-align: center;
  border: 1px solid #ccc;
  padding: 8px;
    height: 100px;
}

.tr .td:first-child {
  background-color: #d4f7fd;
  font-weight: bold;
}

/* 添加响应式样式，以便在小屏幕上也能良好显示 */
/* @media (max-width: 600px) {
  .class-table, .thead, .tbody, .tr {
    display: block;
  }

  .tr {
    padding: 8px;
    background-color: white;
    border: 1px solid #ccc;
  }

  .th, .td {
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  .th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
} */
</style>