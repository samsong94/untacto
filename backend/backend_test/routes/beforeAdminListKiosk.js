/beforeAdminListKiosk.js*/
const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const adminListKioskRouter = require('./adminListKiosk');
const {	verifyToken	} = require('./tokenAuth');

router.use(cookieParser());
router.get('/',verifyToken, adminListKioskRouter);
module.exports = router;
