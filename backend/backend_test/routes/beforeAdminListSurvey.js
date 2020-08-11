/beforeAdminListSurvey.js*/
const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const adminListSurveyRouter = require('./adminListSurvey');
const {	verifyToken	} = require('./tokenAuth');

router.use(cookieParser());
router.get('/',verifyToken, adminListSurveyRouter);
module.exports = router;
