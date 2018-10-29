
import user_info_model from '../models/user-info'

const renderUserInfo = async () => {
    // 获取到用户信息
    let user_info = await user_info_model.getUserInfo()
    // 渲染
    if ( user_info.status === 200 ) { // 已经登录了所以返回用户信息
        $('.user-info .nickname').html(user_info.data.nickname)
    }

    $('.user-info .exit').click( async function () {
        // 应该后端来进行推出
        let _result = await user_info_model.exit()
        if ( _result.status === 200 ) {
            window.location.href = "/admin.html"
        }
    })
}

export default {
    renderUserInfo
}