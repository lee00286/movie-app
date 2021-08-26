const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt가 몇 글자인지 나타냄
const jwt = require('jsonwebtoken');

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
});

// Register Route에서 user.save를 실행하기 전에 이 function 실행
userSchema.pre('save', function(next) { 
    var user = this;                        // userSchema
    if(user.isModified('password')) {       // 비밀번호가 변경되었을 경우, 비밀번호를 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);        // err이 날 경우, user.save의 err로 넘어감
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);    // err이 날 경우, user.save의 err로 넘어감
                user.password = hash;
                next();                      // 이 function이 끝나면 Register route로 돌아가 user.save를 실행
            })
        });
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) { // 암호화되지 않은 비밀번호를 암호화하여 비교
        if(err) return cb(err);
        cb(null, isMatch);
    })

}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken'); // jsonwebtoken을 이용해서 token 생성
    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // 토큰을 decode하면 user id가 나옴
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾음
        user.findOne({ "_id": decoded, "token": token }, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        });
    });
}

const User = mongoose.model('User', userSchema); // Schema를 모델로 감싸줌

module.exports = { User };