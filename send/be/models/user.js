
const mongoose = require('../util/mongoose')




// 通过用户id返回用户数据
const getUserInfoById = (id) => {
    return UserModel
    .find({ _id: id })
    .then((results) => {
        return results[0]
    })
    .catch(() => {
        return false
    })
            
}

module.exports = {
    getUserInfoById
}