export var socketTask='';
export const wsopen=()=>{
	if(uni.getStorageSync('token')!=''){
		socketTask=uni.connectSocket({
			url: "ws://localhost:8080/websocket",
			header: {},
			method: 'GET',
			success: (e) => {
				console.log('ws connected ',e);
			}
		})//连接
		socketTask.onOpen((res) => {
			console.log('Ws open ' + res.data);//后端返回的res
		 })
		 socketTask.onMessage(function (res) {
		   console.log('ws receive ' + res.data);
		 });
		 socketTask.onError(function (res) {
		   console.log('ws error ' + res.errMsg);
		 });
		 socketTask.onClose(function (res) {
		   console.log('ws close ' + res.reson);
		 })
	}
	else{
		console.log('未登录');
	}
}
export const wssend = (msg) => {
	socketTask.send({
	  data:msg,
	  success:(res)=>{
		  console.log('ws send successed ',res)
	  },
	  fail:(err)=>{
		  console.log("send fail ",err)
	  }
	});
}//发送
export const wsclose = () => {
	socketTask.close({
		//有待添加
		success:(res)=>{
			console.log('ws closed ',res);
		}
	});
}//关闭