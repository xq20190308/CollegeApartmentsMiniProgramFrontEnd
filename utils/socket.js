import { ref } from "vue"
export {
    getWebSocket,
    websoket,
    webSoketInit,
    closeSocket,
    sendMessage,
};
​
const websoket = ref(null);
const webSoketInit = (role, id) => {

    const wsUrl = "ws://localhost:8080"
	
    websoket.value = uni.connectSocket({
        url: wsUrl,
        success: () => {
            console.log('websoket连接成功');
        },
        fail: () => {
            console.log('websoket连接失败');
        },
    });
​
    websoket.value.onOpen((res) => {
        if (websoket.value.readyState === 1) {
            websoket.value.send({
                data: '测试回复',
            })
        }
​
    });
​
    websoket.value.onClose(() => {
        console.log('已经被关闭了');
    });
​
    websoket.value.onMessage((res) => {
        console.log('接收到后端发送消息', res);
    });
​
};
​
// 获取websocket对象
const getWebSocket = () => {
    return websoket
};
​
// 关闭websocket离开这个页面的时候执行关闭
const closeSocket = () => {
    websoket.value.close({
        success(res) {
            this.is_open_socket = false;
            console.log('关闭成功', res);
        },
        fail(err) {
            console.log('关闭失败', err);
        },
    });
};
​
const sendMessage = (message) => {
    console.log("发送消息", message)
​
    if (websoket.value.readyState === 1) {
        websoket.value.send({
            data: message,
        })
    }
};