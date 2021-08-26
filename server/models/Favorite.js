const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({ // mongoose를 이용하여 Schema 생성
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User' // User 모델에서 ObjectId를 사용해서 정보를 가져옴
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        Type: String
    }
}, { timestamps: true });

const Favorite = mongoose.model('Favorite', favoriteSchema); // Schema를 모델로 감싸줌

module.exports = { Favorite };