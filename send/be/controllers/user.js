
const admin_model = require('../models/admin')
const getUserInfo = async function(req, res, next) {
    // 先验证用户是否登录
    if ( req.session.userinfo.userid ) {
        let _user_info = await admin_model.getUserInfoById(req.session.userid)
        res.render('user', {
            code: 200,
            data: JSON.stringify(_user_info)
        })
    } else {
        res.render('user', ({
            code: 201,
            data: JSON.stringify({
                msg: '登陆后获取'
            })
        }))
    }
    

}

const exit = (req, res) => {
    // 清楚这个用户的标识信息
    req.session.userinfo = null
    res.render('user', {
        code: 200,
        data: JSON.stringify({
            msg: '退出成功'
        })
    })
}

const isSignIn = (req, res) => {
    let _isSignIn = !!req.session.userinfo
    res.render('user', {
        code: _isSignIn ? 200 : 201, data: JSON.stringify({ msg: _isSignIn ? '已经登录' : '未登录' })
    })

}

module.exports = {
    getUserInfo,
    exit,
    isSignIn
}