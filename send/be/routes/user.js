var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user')
var { resApplicationJson } = require('../middlewares')

router.use(resApplicationJson)
/* GET home page. */
router.get('/info', user_controller.getUserInfo);
router.get('/exit', user_controller.exit);
router.get('/issignin', user_controller.isSignIn);

module.exports = router;
