const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId })
        .exec(( err, info) => { // info에 사람들의 favorite 정보가 들어있음
            if (err) return res.status(400).send(err);
            // 그 다음에 front-end에 다시 숫자 정보를 보내주기
            res.status(200).json({ success: true, favoriteNumber: info.length });
        });
});

router.post('/favorited', (req, res) => {
    // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기

    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => { // info에 사람들의 favorite 정보가 들어있음
            if (err) return res.status(400).send(err);

            // 영화를 favorite 리스트에 넣지 않았을 때
            let result = false;
            if (info.length !== 0) {
                result = true;
            }

            // 그 다음에 front-end에 다시 숫자 정보를 보내주기
            res.status(200).json({ success: true, favorited: result });
        });
});

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom:req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err);
            express.status(200).json({ success: true, doc });
        })
});

router.post('/addToFavorite', (req, res) => {
    req.body
    const favorite = new Favorite(req.body); // req.body에는 Sections/Favorite.js에 들어있는 정보들이 저장됨
    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true });
    }); // req.body에 있는 정보가 favorite에 들어감
});

module.exports = router;