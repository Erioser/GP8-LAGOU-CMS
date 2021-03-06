// 引入样式
import '../stylesheets/app.scss'
// 引入路由
import router from './router'
// 主体结构视图
import body_template from './views/body.html'

// 引入登录权限验证
import { userSigninAuth } from './util/auth'
import user_controller from './controllers/user'

$('#wrapper').html(body_template)

let init = async () => {
    let isSignIn = await userSigninAuth()
    if ( isSignIn ) {
        $('#wrapper').removeClass('hidden')
             
        router.init()
        user_controller.renderUserInfo()       
    }else {
        window.location.href="/admin.html"
    }
}


init()
