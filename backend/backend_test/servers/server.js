const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const bodyParser = require('body-parser');
const port =process.env.PORT || 3101;
const cookieParser = require('cookie-parser');

const route = require('../routes/index');
const createSurveyRouter = require('../routes/beforeCreateSurvey');
const signUpRouter = require('../routes/signUp');
const loginRouter = require('../routes/login');
const logoutRouter = require('../routes/logout');
const checkRouter = require('../routes/check');
const detailRouter = require('../routes/beforeSurveyDetail');
const showSurveyListRouter = require('../routes/showSurveyList');

app.use(bodyParser.json());
app.use(cookieParser());

//var companyId = express.request.cookies.companyId;

app.use('/api/auth/signup', signUpRouter);
app.use('/api/auth/login', loginRouter);
app.use('/api/auth/logout', logoutRouter);
app.use('/api/auth/check', checkRouter);
app.use('/api/surveys',createSurveyRouter);
app.use('/api/surveys?', showSurveyListRouter);
app.use('/api/answers/',detailRouter);
//app.use('/api/answers?',Router);
//app.use('/api/surveys',express.static('uploads'));

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})
