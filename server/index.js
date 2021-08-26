const express = require('express');
const app = express();

// Dependencies
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');         // mongo key를 가져옴

const { auth } = require('./middleware/auth');  // auth를 가져옴
const { User } = require("./models/User");      // User model(회원가입 정보)을 가져옴

// json 형식으로 오는 데이터를 받음 (postman에서 데이터 보낸 걸 받을 수 있도록 함)
// bodyParser.json();
// application/x-www-form-urlencoded와 같은 형식으로 된 데이터를 가져올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된 데이터를 분석해서 가져올 수 있게 함
app.use(bodyParser.json());
app.use(cookieParser());

// routes (router로 파일에 들어가는 요소들을 나눠줌)
app.use('/api/favorite', require('./routes/favorite'));

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {                   // prod.js에서 사용한 게 mongoURI임
    userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))    // MongoDB가 연결됨
  .catch(err => console.log(err))                     // MongoDB가 연결되지 않음

// Register Route (회원가입 때 필요한 정보를 client에서 가져오면 db에 넣어줌)
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);                    // body-parser을 통해 정보를 받음
  user.save((err, userInfo) => {                      // mongoDB에서 오는 method
    if(err) return res.json({ success: false, err })  // 성공하지 못한 경우, 에러 메시지 전달
    return res.status(200).json({                     // 성공했을 경우
      success: true
    })
  })
})

// Login Route
app.post('/api/users/login', (req, res) => { 
  User.findOne({ email: req.body.email }, (err, user) => { 
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청된 비밀번호가 db에 있는지 검색
    user.comparePassword(req.body.password, (err, isMatch) => { 
      if(!isMatch) { // 비밀번호가 맞지 않을 경우
        return res.json({ 
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        })
      }
    })
    // 비밀번호가 맞다면 token 생성
    user.generateToken((err, user) => {
      if(err) return res.status(400).send(err);

      // 토큰을 쿠키에 저장
      res.cookie('x_auth', user.token) // 쿠키에 x_auth라는 이름으로 들어감
      .status(200)
      .json({ loginSuccess: true, userId: user._id })
    })
  })
})

// Auth Route (유저의 로그인 여부와 권한을 체크)
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // role이 0이면 일반 유저, role이 0이 아니면 관리자
    isAuth: true, // auth를 통과했으므로 Authentication은 true임
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

// Logout Route
app.get('/api/users/logout', auth, (req, res) => {
  // 로그아웃한다는 것은 현재 로그인 상태이기 때문에 auth를 추가
  console.log('req.user', req.user);
  // 로그인 하려는 유저를 찾고 데이터 업데이트
  User.findOneAndUpdate({ _id: req.user._id }, 
    { token: "" }, // 토큰을 삭제하면 auth를 통과할 수 없기 때문에 로그인이 풀림
    (err, user) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
      }
    ) 
})

const port = 5000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})