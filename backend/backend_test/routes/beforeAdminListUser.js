/beforeAdminListUser.js*/
const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const adminListUserRouter = require('./adminListUser');
const {	verifyToken	} = require('./tokenAuth');

router.use(cookieParser());
router.get('/',verifyToken, adminListUserRouter);
module.exports = router;
