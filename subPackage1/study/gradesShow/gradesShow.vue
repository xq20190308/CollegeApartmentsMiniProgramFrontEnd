<template>
  <!-- 模板部分，包含一个头部插槽和一个学期选择器，以及一个成绩列表 -->
  <div>
    <!-- 头部插槽 -->
    <headslot></headslot>
    <!-- 学期选择器 -->
    <picker @change="bindPickerChange" :value="index" :range="yearArr">
      <view>{{ showSelect }}</view>
    </picker>
    <!-- 成绩列表 -->
    <view v-if="show">
      <view v-for="item in grade" :key="item.kcmc">
        <text>{{ item.kclbmc }} - {{ item.kcmc }} - {{ item.ksxzmc }} - {{ item.xf }} - {{ item.zcj }}</text>
      </view>
    </view>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import headslot from '@/components/headslot/headslot.vue';
import { useLoginStore } from "/store/login.js";
import {http} from '@/utils/http';
const loginInof = useLoginStore()
// 定义响应式状态
const index = ref(1); // 定义一个响应式变量，用于表示学期选择的索引
const yearArr = ref([
  { show: '请稍后', value: '' }, // 定义一个响应式数组，用于存储学期选项
  // 这里添加学期数据
]);
const point = ref(0); // 定义一个响应式变量，用于存储总分数
const pointN = ref(0); // 定义一个响应式变量，用于存储总分数
const pointW = ref(0); // 定义一个响应式变量，用于存储加权平均分数
const show = ref(false); // 定义一个响应式变量，用于控制成绩列表的显示状态
const grade = ref([]); // 定义一个响应式数组，用于存储成绩信息
const adShow = ref(false); // 定义一个响应式变量，用于控制广告的显示状态
const showSelect = ref(''); // 定义一个响应式变量，用于存储选中的学期

// 页面加载时执行的方法
onMounted(async () => {
  // 处理学期逻辑
  let term = uni.getStorageSync('curTerm'); // 从本地存储中获取当前学期
  if (!term) { // 如果本地存储中没有学期信息，则从后端获取
    const res = http('/api/getGrade/'+'2023-2024-1', "POST",{
			username: loginInof.qz.username,
			password: loginInof.qz.password
		},).then((res)=>{
			console.log("res", res);
			 term = res; // 假设响应数据中包含学期信息
			uni.setStorageSync('curTerm', term); // 将学期信息存储在本地存储中
			console.log("term", term);
		})
    // 'if (res.statusCode === 200) { // 检查响应状态码是否为200
    //   const term = res.data.term; // 假设响应数据中包含学期信息
    //   uni.setStorageSync('curTerm', term); // 将学期信息存储在本地存储中
    // } else {
    //   console.error('获取学期信息失败，状态码：', res.statusCode);
    // }'
  }
console.log('term:',term);
  const year = parseInt(term.split('-')[1]); // 解析学期年部分
  const yearArr = [{ show: '全部学期', value: '' }]; // 定义一个数组，用于存储学期选项
  for (let i = 1; i <= 4; ++i) { // 循环生成学期选项
    const firstTerm = (year - i) + '-' + (year - i + 1) + '-2'; // 生成第一个学期的日期
    const secondTerm = (year - i) + '-' + (year - i + 1) + '-1'; // 生成第二个学期的日期
    if (firstTerm <= term) { // 如果第一个学期日期小于等于当前学期，则添加到数组中
      yearArr.push({ show: firstTerm, value: firstTerm });
    }
    if (secondTerm <= term) { // 如果第二个学期日期小于等于当前学期，则添加到数组中
      yearArr.push({ show: secondTerm, value: secondTerm });
    }
  }
  yearArr.value = yearArr; // 注意这里需要使用 value 访问 ref 定义的变量
  initGrade(); // 调用初始化成绩的方法
});

// 页面显示时执行的方法
onMounted(() => {
  // 页面显示时的逻辑
});

// 学期选择器改变时执行的方法
const bindPickerChange = (e) => {
  console.log(yearArr.value[e.detail.value].value); // 打印选中的学期值
  const stuYear = yearArr.value[e.detail.value].value; // 获取选中的学期值
  const query = (stuYear === '' ? '' : '/' + stuYear); // 构建查询字符串
  showSelect.value = yearArr.value[e.detail.value].show; // 更新选中的学期显示文本
  index.value = e.detail.value; // 更新学期选择的索引
  getGradeRemote(query); // 调用获取成绩的远程方法
};

// 初始化成绩的方法
const initGrade = () => {
  const stuYear = showSelect.value; // 获取选中的学期值
  const query = (stuYear === '' ? '' : '/' + stuYear); // 构建查询字符串
  getGradeRemote(query); // 调用获取成绩的远程方法
};

// 获取成绩的异步方法
const getGradeRemote = async (query) => {
  try {
    const res = await uni.request({
      url: '/api/getGrade/' + query, // 构建完整的URL
      method: 'GET',
    });
    if (res.statusCode === 200) { // 检查响应状态码是否为200
      const data = res.data.data; // 假设响应数据中包含成绩信息
      let point = 0;
      let pointN = 0;
      let pointW = 0;
      let n = 0;
      data.forEach((value) => {
        if (value.kclbmc !== '公选') {
          n++;
          point += value.xf;
          if (value.zcj === '优') {
            pointN += 4.5;
            pointW += (4.5 * value.xf);
          } else if (value.zcj === '良') {
            pointN += 3.5;
            pointW += (3.5 * value.xf);
          } else if (value.zcj === '中') {
            pointN += 2.5;
            pointW += (2.5 * value.xf);
          } else if (value.zcj === '及格') {
            pointN += 1.5;
            pointW += (1.5 * value.xf);
          } else if (value.zcj === '不及格') {
            // 忽略不及格成绩
          } else {
            const s = parseInt(value.zcj);
            if (s >= 60) {
              pointN += ((s - 50) / 10);
              pointW += (((s - 50) / 10) * value.xf);
            }
          }
        }
      });
      point.value = point; // 更新总分数
      pointN.value = (pointN / n).toFixed(2); // 更新加权平均分数
      pointW.value = (pointW / point).toFixed(2); // 更新加权平均分数
    }

    // 如果没有成绩，使用默认值
    const defaultValue = { kclbmc: '暂无', kcmc: showSelect.value + '学期暂无成绩', ksxzmc: '暂无成绩', xf: 0, zcj: '100' };
    grade.value = !data || !data[0] ? [defaultValue] : data; // 更新成绩数组
    adShow.value = grade.value.length >= 3 ? true : false; // 更新广告显示状态
    show.value = true; // 更新成绩列表显示状态
  } catch (error) {
    console.error('获取成绩失败:', error);
      uni.toast('获取成绩失败，请重试');
  }
};
</script>

<style>
  /* 这里添加您的样式 */
</style>
