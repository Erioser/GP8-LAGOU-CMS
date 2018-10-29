const URL = require('url')
const _none = () => {}

// 返回用户登录状态
const userSigninState = () => {
    // return !!URL.parse(window.location.href, true).query.ok
    return !!localStorage.getItem('user')
}
// 验证用户登录状态
const userSigninAuth = (success = _none, fail = _none) => {
    let auth = userSigninState()
    if ( auth ) {
        success(auth)
        return true;
    } else {
        fail()
        return false
    }
}

export  {
    userSigninState,
    userSigninAuth
}

export default {
    userSigninState,
    userSigninAuth
}