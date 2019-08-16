
var salesOffices = {}; // 定义售楼处
salesOffices.clientList = []; // 缓存列表，存放订阅者的回调函数
salesOffices.listen = function(fn) {
    this.clientList.push(fn);
};

salesOffices.trigger = function() {
    for(var i = 0,fn; fn = this.clientList[i++];) {
        fn.apply(this, arguments); // arguments 是发布消息时带上的参数
    }
}

// 下面简单测试

salesOffices.listen(function(price, squareMeter) {
    console.log('价格=' + price);
     console.log('平方米=' + squareMeter);
})

salesOffices.trigger(200000, 88); // 输出： 200万，88平方米