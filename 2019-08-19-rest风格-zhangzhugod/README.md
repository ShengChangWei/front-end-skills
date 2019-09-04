# REST 风格

## 1、概述REST是什么 ?
> 文本

REST即表现层状态转换（英文：Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。它是一种针对网络应用的设计和开发方式，可以降低开发的复杂性，提高系统的可伸缩性。

它涉及到三个重要名词：

+ 资源
所谓资源简单讲就是服务所能提供的数据，可以是实体数据也可是媒体类型，图片、PDF、文本等

+ 表现层
何为变现层？简单说就是将数据以某种方式展现给用户，或者给客户返回一张图片等等动作称之为表现，通常是已JSON或XML形式展现数据

+ 状态转换
 状态转换就是对数据进行一系列的操作，因为资源本身并非一尘不变，随着需求的变化而变化。一个资源可能会随着需求的变化而经历一个资源创建、修改、查询、删除等过程，REST风格正是基于HTTP协议运行的，HTTP协议又被称为无状态协议，所以资源的变化需要在服务端完成。

REST 是Web服务的一种架构风格

使用HTTP、URL 等广泛流行的标准和协议

轻量级、跨平台‘跨语言的架构设计。

REST是一种设计风格。它不是一种标准，也不是一种软件，而是一种思想。

REST通常基于使用HTTP ,URL ,和XML,json 以及 HTML这些现有的广泛流行的协议和标准。


## 2、RESTful是什么?

RESTful对应的中文是 REST 式的。

RESTful Web Service是一种常见的REST的应用，是遵守了REST风格的Web服务。

REST式的Web服务是一种ROA （面向自资源的架构）

用一句话来概括RESTful API(具有REST风格的API): 用URL定位资源，用HTTP动词（GET,HEAD,POST,PUT,PATCH,DELETE）描述操作，用响应状态码表示操作结果。

## 3、REST  架构的主要原则

     网络上的所有事物都可以被抽象为资源 （Resource）

     每个资源都有一个唯一的资源标识符 （Resource identifier）

     同一资源具有多种表现形式 （XML  JSON等）

     对资源的各种操作不会改变资源标识符。

     所有的操作都是无状态的  （Stateless）

     符合REST原则的架构方式即可称为RESTful

## 4、URI 和 URL

     URI    - http://example.com/users/

     URL    http://example.com/users/{user}{one for each user}

## 5、RESTful的无状态性：

无状态性使得客户端和服务端不必保存对方的详细信息，服务器只需要处理当前Request,而不必了解前面Request的历史。从而可以更容易地释放资源。

让服务器充分利用Pool技术来提高稳定性。


## 6、REST风格之RUI设计

    在做这个之前有必要清楚Http协议的7种常用动作：GET、POST、PUT、PATCH、DELETE、HEAD、OPTIONS

```javascript
          # 以id为编码 获取商品信息
          GET  /goods/1
          # 获取多个商品信息
          GET  /goods/{goodName}/{note}
          # 创建商品信息
          POST  /goods/{goodName}/{price}/{note}
          # 修改商品信息
          PUT  /goods/{goodName}/{price}/{note}
          # 修改商品部分
          PATCH  /goods/{goodName}/{note}
          # 删除某个商品信息
          DELETE  /goods/2
```

## 7、 对比：

      ### 7.1、之前的操作：

      http://127.0.0.1/user/query/1 GET        根据用户id查询用户数据

      http://127.0.0.1/user/save    POST       新增用户

      http://127.0.0.1//user/update  POST       修改用户

      http://127.0.0.1/user/delete   GET/POST  删除用户数据

      ### 7.2、RESTful用法：（不需要对操作进行描述）

      http://127.0.0.1/user/1    GET         根据用户id查询用户数据

      http://127.0.0.1/user      POST        新增用户

      http://127.0.0.1//user      PUT         修改用户

      http://127.0.0.1/user      DELETE     删除用户数据

## 8、REST风格端点

```javascript

# 创建一个商品实体类
 public class goods{
    private Long id;
    private String goodsName;
    private Double price;
    private String note;

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public String getGoodsName(){
        return goodsName;
    }
    public void setGoodsName(String goodsName){
        this.goodsName = goodsName;
    }
    public Double getPrice(){
        return price;
    }
    public void setPrice(Double price){
        this.price = price;
    }
    public String getNote(){
        return note;
    }
    public void setNote(String note){
       this.note = note;
    }
}
```

```javascript

# 控制器
@Controller
public class GoodsController{
    /**
     *REST风格 获取商品的GET请求方式
     **/
     @GetMapping(value="/goods/{id}")
     @ResponseBody
    public Goods getGoods(@Pathvariable("id") Long id){
        Goods goods = goodsService.getGoods(id);
        return goods;
    }
    /**
     *REST风格 PUT请求修改商品信息
     **/
     @GetMapping(value="/goods/{id}")
     @ResponseBody
    public Goods getGoods(@Pathvariable("id") Long id,@RequestBody Goods goods){
        Goods goods = goodsService.getGoods(id);
        goods.setId(id);
        goodsService.update(goods);
        return goods;
    }
    /**
     *REST风格 使用HTTP的DELETE请求删除商品信息
     **/
     @GetMapping(value="/goods/{id}")
     @ResponseBody
    public String getGoods(@Pathvariable("id") Long id){
        int status = goodsService.deleteGoods(id);
        String result = "";
        if(status=0){
            result = "操作成功";
        }else{
            result = "操作失败";
        }
        return result;
    }
}

```
## 9、相关链接
+ [使用REST风格架构您需要知道的一些事](https://www.cnblogs.com/vipyoumay/p/8042924.html)
+ [详解REST架构风格](http://www.uml.org.cn/zjjs/201805142.asp)
+ [REST，以及RESTful的讲解](https://blog.csdn.net/qq_21383435/article/details/80032375)




