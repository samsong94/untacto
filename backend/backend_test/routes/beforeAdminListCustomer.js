/beforeAdminListCustomer.js*/
const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const adminListCustomerRouter = require('./adminListCustomer');
const {	verifyToken	} = require('./tokenAuth');

router.use(cookieParser());
router.get('/',verifyToken, adminListCustomerRouter);
module.exports = router;
