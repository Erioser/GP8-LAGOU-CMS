
### 前后台项目开发

前端项目：

前段时间时间开发了拉钩的前台项目（直接给用户使用），还需要开发一个后台项目（CMS管理系统）

后端项目：

整个拉钩后端的服务器


### 搭建前端的CMS项目开发环境

选用webpack作为工程化工具，webpack是一个基于配置的前端模块化打包工具。

需要先去下载webpack  

全局安装了webpack，执行命令的时候就可以直接webpack来执行了，如果全局没有装，只在本地装包，只能执行./node_modules/bin/webpack ...

为了使用更方便，一般会全局安装，webpack目前版本为4.X，需要搭配webpack-cli使用

在本地也需要安装 webpack

#### webpack的使用

可以直接通过webpack命令来执行打包操作，通过 --env来配置一些参数

webpack的基本命令：

--help 查看所有的命令

--mode development production none

-o 配置出口

--config 配置 配置文件

一般都是通过配置文件来进行使用：

webpack默认会根据webpack.config.js中的配置进行模块化打包


#### 插件Plugin

plugin是解决loader做不了的事情的，现在准备让html页面出现在输出目录中

使用 html-webpack-plugin

插件和入口出口一样需要直接在配置文件中进行配置,在其中放入插件的实例就相当于在使用插件

copy-webpack-plugin 可以将文件进行复制

#### dev server

我们使用webpack-dev-server工具来替代webpack，在启动的时候就会开启热更新服务

> 其实工程化工具不止gulp/webpack/grunt，还有很多，比如parcel， rollup


### css/scss/...等文件的处理

在开发的时候可以在js文件中引入css/scss文件，但是我们需要使用loader来处理

css-loader 可以将引入到js中的css模块中的代码放入到js中

style-loader 可以将js中的css代码放入到style标签中去

sass-loader  可以将sass代码编译成css代码

针对图片，我们直接将图片打包（复制）到输出目录，直接引入，也可以模块化使用

url-loader 基于file-loader，专业处理图片，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。

babel-loader 编译ES高级语法

####  使用前端框架来快速搭建项目结构
​
使用基于bootstrap的ui框架 adminLTE 来快速开发CMS应用

准备采用 [RMVC(P)](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html) 结构实现单页面开发

使用[sme-router](https://sme-fe.github.io/website-router/zh/) 工具实现前端路由

sme-router的api使用和express很相似




####  使用express搭建后端项目结构

生成express应用程序

    npm install express-generator -g

    express项目解析：

    app.js 创建应用程序
    bin/www.js 开启服务


后端也需要使用架构思想  MVC  views（给前端响应的）controllers model（提供数据）


​前端采用RMVC，后端也是RMVC

后端是纯的api server所以只需要实现api接口就可以

接口文档：

形式没有限制，属于开发文档中的一部分

url ， method， params （isRequired，default），response （data object （city， positionName）， code （200， 500））

​	


分页

后端： 不能一次性把数据全部给了前端，要求后端将数据分段返回

       接收到请求中的参数（start，count，pageNo，pageSize）从哪里开始返回以及返回多少条

> http请求方式其实有很多种（8）种

> [restfulAPI](http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html)  RESTful 是目前最流行的 API 设计规范，用于 Web 数据接口的设计。


### 地图与定位

定位功能 实现，主要有如下几种:

1. H5定位

    H5提供了 navigator.geolocation

   // 判断浏览器是否支持
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(updatPos,errorLoca);
        function updatPos(position){
            var latitude = position.coords.latitude;//十进制单位
            var longitude = position.coords.longitude;//十进制单位
            var accuracy = position.coords.accuracy;//以m为单位制定纬度和经度与实际位置的差距
            var timestamp = position.timestamp;
            console.log('经度坐标' + latitude);
            console.log('纬度坐标' + longitude);
            console.log('准确度' + accuracy);
            console.log('获取位置数据的时间' + timestamp);//时间戳
        }
        function errorLoca(error){
            switch(error.code){
                case 0:
                    console.log('位置信息获取失败，失败原因'+error.message);
                break;
                case 1://错误编码 PERMISSION_DENIED
                    console.log('用户拒绝共享其位置信息');
                break;
                case 2://错误编码 POSITION_UNAVAILABLE
                    console.log('尝试获取用户位置数据，但失败了');
                break;
                case 3://错误编码 TIMEOUT
                    console.log('尝试获取用户的位置数据超时');
                break;
            }
        }
    }else{
        alert('浏览器不支持html5 geolocation');
    }

2. 后端定位

    后端可以从请求头中得到用户的ip地址，然后进行定位


3. 地图插件定位


地图插件流行的有这么几种: 百度地图/腾讯地图/高德地图 






### 权限验证

http是无状态协议，登录之后，再次发送请求的时候无法获得上一次http请求的状态

后端需要得到用户标识，就需要去进行处理，目前有两种主流方式： 

1. session
2. tocken

#### Session

前端登录后，后端将此次用户的相关信息，存储在后端的某个地方（本地文件/数据库），要求前端发送请求的时候带上此信息，后端接收到请求后做出验证

后端验证

session保存的时间是可以设置的

存储方式:  登录成功后，保存登录信息到文件/数据库中，同时保存创建时间和过期时间，下次验证的时候取出来做验证

使用express-session中间件来进行session的操作

后端存储好session，需要将其返回给前端，一般是采取cookie的方法，让后端再响应登录成功的信息种设置setCookie(可以让浏览器种下cookie)，而且存再浏览器cookie种，前端发送请求的时候cookie会自动发送到后端, 后端将cookie取出后与session对比处理....


具体操作：

1. 前端登录后，后端存储一个对应的session

    使用express-session中间件

    * 配置expess-session中间件
    * 存: req.session.....
    * 取： req. session...

2. 后端响应登录结果的时候通过set-cookie方式将session以种cookie的形式，保存在前端

3. 前端发送请求的时候cookie跟随请求头发送到后端

4. 后端对session进行验证

5. 做出正确的响应


session的缺点：

1. 容易受到攻击， 重放攻击， cookie 钓鱼

2. 服务器压力大，复制session成本高，可以使用redis分布式数据库 。。。。。。


#### Token(令牌)

后端不在存储认证信息，而是在用户登录的时候生成一个token，然后返回给前端，前端进行存储，在需要进行验证的时候将token一并发送到后端，后端进行验证

1. 用户登录的时候，生成token

    jwt -> json web tokens

    token 中应该包含 payload （数据） cert （密钥） 确定加密方式 SHA256

    npmjs -> jsonwebtoken


> 加密的方式：对称加密和非对称加密，对称加密指的是加密解密使用同一个密钥，非对称加密使用公钥和私钥，加密用私钥加密，解密用公钥解密


2. 返回给前端 cookie 

3. 前端进行存储

4. 前端在进行数据请求的时候发送token到后端

5. 后端进行token验证，而且进行过期时间的验证


生成私钥：

ssh-keygen -t rsa -b 2048 -f private.key

生成公钥

openssl rsa -in private.key -pubout -outform PEM -out public.key


### 捋项目

需求：拉勾网职位管理系统CMS 

管理系统前台项目 + Node.js后台项目


前台项目：

项目工程化工具： Webpack，最大程度进行模块化开发，交由webpack进行打包/编译等等

webpack是基于配置的，基本配置：

entry，output，mudule/rule (loader), plugins (plugin), devServer

css-loader,sass-loader,style-loader,babel-loader,url-loader,string-loader ...

html-webpack-plugin, copy-webpack-plugin

开发架构：RMVC + SPA + MPA

Router: 使用了sme-router实现前端路由切换（基于hash）/ director.js 。。。

Model : 提供数据和数据交互的方法， 利用大量的promise，async，await来进行JS异步编程.

Views ： html片段，利用arttemplate模板引擎进行数据的渲染

Controller： 每一个路由/页面独立逻辑处理

使用了adminLTE模板进行高效快速的开发，使用了大量的Jquery插件优化用户交互体验

引入了高德地图api进行定位和地图显示功能

遇到的问题：

1. 数据交互， 后端返回的数据格式不正确，导致ajax走了error回调...

2. sme-router在异步实例化的时候会出现无法匹配路由的情况，必须保证在init前，router-view已经渲染完成...

3. 模块件私有空间变量不共享，利用events模块实现基于事件机制的发布订阅模式实现跨模块通信


后台项目：

利用express generator生成了应用模板并进行自定义改装

架构：RMVC

Views： 响应给前端的内容结构，封装了各种响应模板

Router： 根据项目api需求进行了路由的划分，使用了大量公用中间件： 响应头处理， 登录权限验证， fileupdate

Controller： 实现具体的业务逻辑，接收请求，响应内容

Model： 提供数据和操作数据库的方法

分离了公共配置，提高代码的可维护性，例如代码版本号

遵循了restful API规范设计项目api接口

数据库选用MongoDB数据库（.....）,封装了mongoose通用操作模块来进行数据库的增删改查

在进行文件操作（。。。）使用fs-extra模块，用户功能模块中，注册中利用bcrypt模块进行密码的加密，monment，利用multer工具创建多个文件处理中间件


细节：

一开始的时候数据验证采用的session机制，当前端请求的时候，利用express-session在后端存储了一条session，express-session会将session—id返回给浏览器（response headers - set-cookie），并且我们可以在这条session中利用req.session.a = 1存储数据

客户端来请求的时候，请求头携带session—id，express-session会根据这个session-id寻找到对应的session，如果不为空，可以取出存储的数据判断/验证等操作

但是因为服务器部署后期变成多个，维护session成本变高，并且项目还有多端登录的需求，后期更改为token的验证模式


首先我们采取了非对称加密机制，生成私钥公钥后，利用jwt规范和工具将用户部分信息加密成token令牌，返回给前端，前端存储在本地，然后再需要验证的时候，前端将token发送给后端，后端利用公钥进行解密后，验证过期时间等条件之后进行数据响应。


服务器部署：

前后端分离部署....

##### webpack生产配置

mode： production

CSS代码抽离： MiniCssWebpackPlugin

css代码压缩： OptimizeCSSAssetsPlugin

JS/CSS 代码文件添加版本号

postcss 给css做兼容处理

externals， 引入cdn资源后，消除模块化中的资源引入


。。。。










