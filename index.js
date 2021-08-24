const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');  // body-parser Dependency

const config = require('./config/key');     // mongo key를 가져옴

const { User } = require("./models/User");  // User model(회원가입 정보)을 가져옴

// json 형식으로 오는 데이터를 받음 (postman에서 데이터 보낸 걸 받을 수 있도록 함)
bodyParser.json();
// application/x-www-form-urlencoded와 같은 형식으로 된 데이터를 가져올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된 데이터를 분석해서 가져올 수 있게 함
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {                   // prod.js에서 사용한 게 mongoURI임
    userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))    // MongoDB가 연결됨
  .catch(err => console.log(err))                     // MongoDB가 연결되지 않음


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 회원가입을 위한 route (회원가입 때 필요한 정보를 client에서 가져오면 db에 넣어줌)
app.post('/register', (req, res) => {
  const user = new User(req.body);                    // body-parser을 통해 정보를 받음
  
  user.save((err, userInfo) => {                      // mongoDB에서 오는 method
    if(err) return res.json({ success: false, err })  // 성공하지 못한 경우, 에러 메시지 전달
    return res.status(200).json({                     // 성공했을 경우
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})