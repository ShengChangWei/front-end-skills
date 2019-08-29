// 定义售楼处
let event = {
    clientList: [], // 缓存列表，存放订阅者的回调函数
    subscribe: function (fn) { //订阅事件
        this.clientList.push(fn);
    },
    publish: function () {
        for (var i = 0, fn; fn = this.clientList[i++];) {
            fn.apply(this, arguments); // arguments 是发布消息时带上的参数
        }
    }
};

// 下面简单测试

event.subscribe(function (price, squareMeter) {
    console.log('价格=' + price);
    console.log('平方米=' + squareMeter);
})

event.publish(200000, 88); // 输出： 200万，88平方米
event.publish(3000000, 110); // 输出：300 万，110 平方米