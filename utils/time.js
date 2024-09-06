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
export const getCurrentDate = () => {
	  const now = new Date();
	  const year = now.getFullYear(); // 获取年份
	  const month = now.getMonth() + 1; // 获取月份，月份需要+1
	  const day = now.getDate(); // 获取日
	 
	  // 格式化输出
	  return `${year}-${month}-${day}`;
}
export const getTimeStamp = (formattedTime)=> {
	return Date.parse(formattedTime);
}
export const getCourseDate = (start,addtion) => { 
	const now = new Date(start);
	now.setDate(now.getDate()+addtion)
	const month = now.getMonth() + 1; // 获取月份，月份需要+1
	const day = now.getDate(); // 获取日
	// 格式化输出
	return `${month}-${day}`
}