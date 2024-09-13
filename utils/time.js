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
	const year = now.getFullYear();
	const month = now.getMonth() + 1; // 获取月份，月份需要+1
	const day = now.getDate(); // 获取日
	// 格式化输出
	return `${year}-${month}-${day}`
}
//传入两个没有年份格式化的字符串时间，比较两个时间的大小，返回true表示第一个时间在第二个时间之前
export const beforeTime = (time1,time2) => {
	// console.log("time1",time1)
	// console.log("time2",time2)
	// console.log("time1",getTimeStamp(time1))
	// console.log("time2",getTimeStamp(time2))
	// console.log(getTimeStamp("2024-9-2 00:00:00"))
	// console.log("<",getTimeStamp(time1)<getTimeStamp(time2))
	return getTimeStamp(time1) < getTimeStamp(time2)
}
export const afterTime = (time1,time2) => {
	// console.log("time1",time1)
	// console.log("time2",time2)
	// console.log("time1",getTimeStamp(time1))
	// console.log("time2",getTimeStamp(time2))
	// console.log(getTimeStamp("2024-9-2 00:00:00"))
	// console.log("<",getTimeStamp(time1)<getTimeStamp(time2))
	return getTimeStamp(time1) > getTimeStamp(time2)
}
export const compareTime = (time1,time2) => {
	// console.log("time1",time1)
	// console.log("time2",time2)
	// console.log("time1",getTimeStamp(time1))
	// console.log("time2",getTimeStamp(time2))
	// console.log(getTimeStamp("2024-9-2 00:00:00"))
	// console.log("<",getTimeStamp(time1)<getTimeStamp(time2))
	return getTimeStamp(time1) === getTimeStamp(time2)
}