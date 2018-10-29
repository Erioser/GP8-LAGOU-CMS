// 引入样式
import '../stylesheets/app.scss'
// 引入路由
import router from './router'
// 主体结构视图
import body_template from './views/body.html'
// 用户信息处理的控制器
import user_info_controller from './controllers/user-info'

// 引入登录权限验证
import { userSigninAuth } from './util/auth'



// 登录验证
userSigninAuth((auth) => { // 如果用户已经登录
    // 渲染整体内容结构
    $('#wrapper').html(body_template)
    // 启动路由
    router.init()

    // 渲染用户信息
    user_info_controller.renderUserInfo()
}, () => { // 没有登录，直接跳转到admin
    window.location.href="/admin.html"
})


