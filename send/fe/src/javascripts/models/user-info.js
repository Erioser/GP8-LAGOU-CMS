
const getUserInfo = () => {
    return $.ajax({
        url: '/api/v1/user/info',
        success: (results) => {
            return results
        }
    })
}
const exit = () => {
    return $.ajax({
        url: '/api/v1/user/exit',
        success: (results) => {
            return results
        }
    })
}

const isSignIn = () => {
    return $.ajax({
        url: '/api/v1/user/issignin',
        success: (results) => {
            return results
        }
    })
}

export default {
    getUserInfo,
    exit,
    isSignIn
}