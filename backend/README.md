# Untacto

> 프로젝트 개요 쓰기

## Proejct Surmmary

> AWS 서버 안에 Maria DB와 node.js를 설치하여 이용한다.  
> Maria DB를 이용하여 회원정보, 설문정보 등을 DB에 저장할 수 있도록 한다.  
> 또한 키오스크와 서버간 설문 광고 및 설문 결과를 송/수신을 할 수 있도록한다.  
> 백엔드는 node.js의 Express를 이용하고 pm2를 이용하여 배포한다.  
> 프론트엔드는 React를 이용하고 Nginx를 이용하여 배포한다.

## SW

|  Name   |          Version           |
| :-----: | :------------------------: |
| Node.js |          v12.18.2          |
| MariaDB | v10.3.22-MariaDB-0+deb10u1 |
|  Nginx  |      v1.14.0(ubuntu)       |
|   pm2   |           v4.4.0           |

## Release History

- 0.0.1
  - Work in progress

## Installation

1. Clone the repo

```sh
git clone https://lab.ssafy.com/s03-webmobile3-sub3/s03p13a103.git
```

2. Install npm packages

```sh
$ cd ./backend/backend-test/
$ npm install
$ npm install moment moment-timezone
$ npm install -g pm2@latest
```

3. Input a port

```js
//./backend/backend-test/servers/server.js
const port = process.env.PORT || [port number];
```

4. Run

```
start express
$ npm start
- http://localhost:8080
```

```
start pm2
$ pm2 start servers/ecosystem.config.js
- http://localhost:8080

If you want to scale up processes
-  pm2 scale untacto +[size]
```

```
run nginx
$ sudo systemctl start nginx
$ sudo systemctl restart nginx
- http://i3a103.p.ssafy.io/
```

## Directory

```
.
└── backend
    └── backend_test
        ├── routes
        │   ├── before*.js
        │   ├── adminAddKiosk.js
        │   ├── adminDeleteCustomer.js
        │   ├── adminDeleteSurvey.js
        │   ├── adminDeleteUser.js
        │   ├── adminListCustomer.js
        │   ├── adminListKiosk.js
        │   ├── adminListSurvey.js
        │   ├── adminListUser.js
        │   ├── adminReadSurvey.js
        │   ├── check.js
        │   ├── createSurvey.js
        │   ├── customerCheck.js
        │   ├── customerLogin.js
        │   ├── customerLogout.js
        │   ├── dashboardAnswer.js
        │   ├── index.js
        │   ├── login.js
        │   ├── logout.js
        │   ├── main.js
        │   ├── mysql-db.js
        │   ├── showSurveyList.js
        │   ├── signUp.js
        │   ├── surveyDetail.js
        │   ├── surveyDetailAnswer.js
        │   └── tokenAuth.js
        └── servers
            └── server.js
```

## Routes description

```
before*.js
adminAddKiosk.js
adminDeleteCustomer.js
adminDeleteSurvey.js
adminDeleteUser.js
adminListCustomer.js
adminListKiosk.js
adminListSurvey.js
adminListUser.js
adminReadSurvey.js
check.js
createSurvey.js
customerCheck.js
customerLogin.js
customerLogout.js
dashboardAnswer.js
index.js
login.js
logout.js
main.js
mysql-db.js
showSurveyList.js
signUp.js
surveyDetail.js
surveyDetailAnswer.js
tokenAuth.js
```

## Routes APIs

```
POST    http://localhost:3001/api/auth/signup
POST    http://localhost:3001/api/auth/login
POST    http://localhost:3001/api/auth/logout
GET     http://localhost:3001/api/auth/check
POST    http://localhost:3001/api/surveys
GET     http://localhost:3001/api/surveys?
GET     http://localhost:3001/api/surveys/:id
GET     http://localhost:3001/api/answers/:id
GET     http://localhost:3001/api/answers?
POST    http://localhost:3001/api/customer/login
GET     http://localhost:3001/api/customer/logout
GET     http://localhost:3001/api/customer/check
GET     http://localhost:3001/api/admin/users
DELETE  http://localhost:3001/api/admin/users/:id
GET     http://localhost:3001/api/admin/customers
DELETE  http://localhost:3001/api/admin/customers/:id
GET     http://localhost:3001/api/admin/kiosks
POST    http://localhost:3001/api/admin/kiosks
GET     http://localhost:3001/api/admin/surveys/:surveyId
DELETE  http://localhost:3001/api/admin/surveys/:surveyId
```

## DB

```
- DB 주소
- DB 비밀번호
- OPEN API KEY
- DB 테이블 이름
- Kiosk ID
- 기업 ID(?)
- Kiosk 위치
- Kiosk 영상 번호(?)
```

# License
