# websocket 使用方法

## 1、概述

WebSocket是一种在单个TCP连接上进行全双工通信的协议。WebSocket通信协议于2011年被IETF定为标准RFC 6455，并由RFC7936补充规范。WebSocketAPI也被W3C定为标准。

WebSocket使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

## 2、背景

现在，很多网站为了实现推送技术，所用的技术都是轮询。轮询是在特定的的时间间隔（如每1秒），由浏览器对服务器发出HTTP请求，然后由服务器返回最新的数据给客户端的浏览器。这种传统的模式带来很明显的缺点，即浏览器需要不断的向服务器发出请求，然而HTTP请求可能包含较长的头部，其中真正有效的数据可能只是很小的一部分，显然这样会浪费很多的带宽等资源。

而比较新的技术去做轮询的效果是Comet。这种技术虽然可以双向通信，但依然需要反复发出请求。而且在Comet中，普遍采用的长链接，也会消耗服务器资源。

在这种情况下，HTML5定义了WebSocket协议，能更好的节省服务器资源和带宽，并且能够更实时地进行通讯。

![AJAX轮询和Websocket](./images/ws.png)

## 3、优点

+ 较少的控制开销。在连接创建后，服务器和客户端之间交换数据时，用于协议控制的数据包头部相对较小。在不包含扩展的情况下，对于服务器到客户端的内容，此头部大小只有2至10字节（和数据包长度有关）；对于客户端到服务器的内容，此头部还需要加上额外的4字节的掩码。相对于HTTP请求每次都要携带完整的头部，此项开销显著减少了。
+ 更强的实时性。由于协议是全双工的，所以服务器可以随时主动给客户端下发数据。相对于HTTP请求需要等待客户端发起请求服务端才能响应，延迟明显更少；即使是和Comet等类似的长轮询比较，其也能在短时间内更多次地传递数据。
+ 保持连接状态。与HTTP不同的是，Websocket需要先创建连接，这就使得其成为一种有状态的协议，之后通信时可以省略部分状态信息。而HTTP请求可能需要在每个请求都携带状态信息（如身份认证等）。
+ 更好的二进制支持。Websocket定义了二进制帧，相对HTTP，可以更轻松地处理二进制内容。
+ 可以支持扩展。Websocket定义了扩展，用户可以扩展协议、实现部分自定义的子协议。如部分浏览器支持压缩等。
+ 更好的压缩效果。相对于HTTP压缩，Websocket在适当的扩展支持下，可以沿用之前内容的上下文，在传递类似的数据时，可以显著地提高压缩率。

## 4、特点

+ 建立在 TCP 协议之上，服务器端的实现比较容易。
+ 与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443 ，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
+ 数据格式比较轻量，性能开销小，通信高效。
+ 可以发送文本，也可以发送二进制数据。
+ 没有同源限制，客户端可以与任意服务器通信。
+ 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。

## 5、Websocket

WebSocket 协议本质上是一个基于 TCP 的协议。

为了建立一个 WebSocket 连接，客户端浏览器首先要向服务器发起一个 HTTP 请求，这个请求和通常的 HTTP 请求不同，包含了一些附加头信息，其中附加头信息"Upgrade: WebSocket"表明这是一个申请协议升级的 HTTP 请求，服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了，双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。

  ### 5.1 WebSocket 对象
     浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，连接建立以后，客户端和服务器端就可以通过 TCP 连接直接交换数据。

     当你获取 Web Socket 连接后，你可以通过 send() 方法来向服务器发送数据，并通过 onmessage 事件来接收服务器返回的数据。

     以下 API 用于创建 WebSocket 对象。

     var Socket = new WebSocket(url, [protocol] );
     以上代码中的第一个参数 url, 指定连接的 URL。第二个参数 protocol 是可选的，指定了可接受的子协议。

  ### 5.2 WebSocket 属性
          以下是 WebSocket 对象的属性。假定我们使用了以上代码创建了 Socket 对象：

属性名 | 类型 | 描述
 -|-|:-
binaryType     | DOMString     | 一个字符串表示被传输二进制的内容的类型。取值应当是"blob"或者"arraybuffer"。"blob"表示使用DOM Blob 对象，而"arraybuffer"表示使用 ArrayBuffer 对象。|
bufferedAmount | unsigned long | 调用 send()) 方法将多字节数据加入到队列中等待传输，但是还未发出。该值会在所有队列数据被发送后重置为 0。而当连接关闭时不会设为0。如果持续调用send()，这个值会持续增长。只读。|
extensions     | DOMString     | 服务器选定的扩展。目前这个属性只是一个空字符串，或者是一个包含所有扩展的列表。|
onclose        | EventListener | 用于监听连接关闭事件监听器。当 WebSocket 对象的readyState 状态变为 CLOSED 时会触发该事件。这个监听器会接收一个叫close的 CloseEvent 对象。|
onerror        | EventListener | 当错误发生时用于监听error事件的事件监听器。会接受一个名为“error”的event对象。|
onmessage      | EventListener | 一个用于消息事件的事件监听器，这一事件当有消息到达的时候该事件会触发。这个Listener会被传入一个名为"message"的 MessageEvent 对象。|
onopen         | EventListener | 一个用于连接打开事件的事件监听器。当readyState的值变为 OPEN 的时候会触发该事件。该事件表明这个连接已经准备好接受和发送数据。这个监听器会接受一个名为"open"的事件对象。|
protocol       | DOMString     | 一个表明服务器选定的子协议名字的字符串。这个属性的取值会被取值为构造器传入的protocols参数。|
readyState     | unsigned short | 连接的当前状态。取值是 Ready state constants 之一。 只读。|
url            | DOMString     | 传入构造器的URL。它必须是一个绝对地址的URL。只读。|

  ### 5.3 WebSocket 事件

  以下是 WebSocket 对象的相关事件。假定我们使用了以上代码创建了 Socket 对象：

  事件 | 事件处理程序 |	 描述
  -|-|-
  open    | Socket.onopen    | 连接建立时触发 |
  message | Socket.onmessage | 客户端接收服务端数据时触发 |
  error	  | Socket.onerror	 | 通信发生错误时触发 |
  close	  | Socket.onclose	 | 连接关闭时触发 |

  ### 5.4 WebSocket 方法

  以下是 WebSocket 对象的相关方法。假定我们使用了以上代码创建了 Socket 对象：

  方法	              描述
  Socket.send()	      使用连接发送数据

  Socket.close()	  关闭连接

  ### 5.5 示例
```
  // Create WebSocket connection.
  const socket = new WebSocket('ws://localhost:8080');

  // Connection opened
  socket.addEventListener('open', function (event) {
      socket.send('Hello Server!');
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
  });
```


## 6、对比
维度 | 传统轮询 | 长轮询 | 服务器发送事件 | WebSocket |
浏览器支持	| 几乎所有现代浏览器  | 几乎所有现代浏览器 | Firefox 6+ Chrome 6+ Safari 5+ Opera 10.1+	 ｜ IE 10+ Edge Firefox 4+ Chrome 4+ Safari 5+ Opera 11.5+ |
服务器负载	| 较少的CPU资源，较多的内存资源和带宽资源  ｜ 与传统轮询相似，但是占用带宽较少	｜ 与长轮询相似，除非每次发送请求后服务器不需要断开连接 ｜ 无需循环等待（长轮询），CPU和内存资源不以客户端数量衡量，而是以客户端事件数衡量。四种方式里性能最佳。 |
客户端负载	｜ 占用较多的内存资源与请求数。 ｜ 与传统轮询相似。 ｜ 浏览器中原生实现，占用资源很小。 ｜ 同Server-Sent Event。 |
延迟         ｜ 非实时，延迟取决于请求间隔。 ｜	同传统轮询。	   ｜非实时，默认3秒延迟，延迟可自定义。 ｜ 实时。 |
实现复杂度	｜ 非常简单。 ｜ 需要服务器配合，客户端实现非常简单。 ｜ 需要服务器配合，而客户端实现甚至比前两种更简单。 ｜ 需要Socket程序实现和额外端口，客户端实现简单。 |

## 7、 websocket重连机制实现
在弱网环境下，发送消息无法抵达接收端；抑或，断网到浏览器约定时限等一些异常情况都会触发onclose和onerror,所以理论上，我们只要在onclose和onerror时，重新创建长连接就可以。
 ## 7.1 实现
根据上面的简单思路，代码如下：
```javascript
var ws = new WebSocket(url);
ws.onclose = function () {
  reconnect()
};
ws.onerror = function () {
  reconnect()
};

function reconnect(url) {
    setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
      var ws = new WebSocket(url);
      ws.onclose = function () {
        reconnect()
      };
      ws.onerror = function () {
        reconnect()
      };
    }, 2000);
}
```
稍微抽取再丰富下，createWebSocket来创建websocket实例，initEventHandle来绑定各回调函数：
```
var ws = new WebSocket(url);
ws.onclose = function () {
  reconnect()
};
ws.onerror = function () {
  reconnect()
};

// 重连
function reconnect(url) {
    setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
      createWebSocket(url);
    }, 2000);
}

// 实例websocket
function createWebSocket(url) {
    try {
        if ('WebSocket' in window) {
            ws = new WebSocket(url);
        } else if ('MozWebSocket' in window) {
            ws = new MozWebSocket(url);
        } else {
            _alert("当前浏览器不支持websocket协议,建议使用现代浏览器",3000)
        }
        initEventHandle();
    } catch (e) {
        reconnect(url);
    }
}

// 初始化事件函数
function initEventHandle() {
    ws.onclose = function () {
        reconnect(wsUrl);
    };
    ws.onerror = function (err) {
        reconnect(wsUrl);
    };
}
```
 ## 7.3优化
弱网、断连所导致重连都是被动的，而在一般的websocket连接中都是存在心跳机制的，客户端和服务端约定一个特定的心跳消息用于检测链路是否通信正常。
我们通过心跳机制，在客户端来检测链路的正常，在约定时间间隔内收不到心跳或者其他任何通信消息时，客户端进行主动重连。
所以下面优化的，我们需要加一个心跳检测的方法：
```
var heartCheck = {
    timeout: heartBeatTime*1000,  //  心跳检测时长
    timeoutObj: null, // 定时变量
    reset: function () { // 重置定时
        clearTimeout(this.timeoutObj);
        return this;
    },
    start: function () { // 开启定时
        var self = this;
        this.timeoutObj = setTimeout(function () {
          // 心跳时间内收不到消息，主动触发连接关闭，开始重连
            ws.close();
        },this.timeout)
    }
}
```
心跳检测对象，定义了

timeout：心跳超时时间
timeoutObj：定时器变量
reset：重置心跳
start：开启心跳
当连接成功时，开启心跳；在收到消息时，重置心跳并开启下一轮检测，所以我们只需要在onopen和onmessage中加入心跳检测就行

```
// 初始化事件函数
function initEventHandle() {
    ws.onclose = function () {
        reconnect(wsUrl);
    };
    ws.onerror = function (err) {
        reconnect(wsUrl);
    };
    ws.onopen = function () {
        heartCheck.reset().start();      //心跳检测重置
    };
    ws.onmessage = function (msg) {    //如果获取到消息，心跳检测重置
        heartCheck.reset().start();      //拿到任何消息都说明当前连接是正常的
        handleMsg(msg)
    };
}
```
 ## 7.4 同时触发多次重连的问题
在实际使用过程中，发现有些浏览器，reconnect重连会多次触发，所以需要给重连加一把锁，当一个重连正在执行的时候，无法再触发一次重连
```
function reconnect(url) {
    if (reconnect.lockReconnect) return;
    reconnect.lockReconnect = true;
    setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
        createWebSocket(url);
        reconnect.lockReconnect = false;
    }, 2000);
}
```

如果是同个浏览器中多个页面共用一个连接来进行通信，那么就需要使用浏览器缓存/数据路（localStorage/indexedDB）去加这把锁。

## 8、服务器
由于WebSocket是一个协议，服务器具体怎么实现，取决于所用编程语言和框架本身。Node.js本身支持的协议包括TCP协议和HTTP协议，要支持WebSocket协议，需要对Node.js提供的HTTPServer做额外的开发。已经有若干基于Node.js的稳定可靠的WebSocket实现，我们直接用npm安装使用即可。

## 9、相关链接
[angular5 组件中使用websocket通信](https://www.jianshu.com/p/93122813a9d8)
[websocket属性参数](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)




