
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

存储方式:  登录成功后，保存登录信息到文件/数据库种，同时保存创建时间和过期时间，下次验证的时候取出来做验证

使用express-session中间件来进行session的操作

后端存储好session，需要将其返回给前端，一般是采取cookie的方法，让后端再响应登录成功的信息种设置setCookie(可以让浏览器种下cookie)，而且存再浏览器cookie种，前端发送请求的时候cookie会自动发送到后端






> mongoose取出已有的collection（Model）

