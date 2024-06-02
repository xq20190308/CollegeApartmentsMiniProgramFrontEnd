export const getCurrentTime = () => {
	  const now = new Date();
	  const year = now.getFullYear(); // 获取年份
	  const month = now.getMonth() + 1; // 获取月份，月份需要+1
	  const day = now.getDate(); // 获取日
	  const hours = now.getHours(); // 获取小时
	  const minutes = now.getMinutes(); // 获取分钟
	  const seconds = now.getSeconds(); // 获取秒钟
	 
	  // 格式化输出
	  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}