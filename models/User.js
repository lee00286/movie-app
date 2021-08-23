const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ // mongoose를 이용하여 Schema 생성
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 띄어쓰기가 있을 경우 띄어쓰기를 없앰
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 유저에게 관리자와 일반 유저 등의 역할 부여
        type: Number,
        default: 0
    },
    image: String,
    token: { // 유효성 관리
        type: String
    },
    tokenExp: { // 토큰을 사용할 수 있는 기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema) // Schema를 모델로 감싸줌

module.exports = { User }