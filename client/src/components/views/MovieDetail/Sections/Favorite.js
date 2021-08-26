import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'antd';

function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    };

    useEffect(() => {
        // mongoDB에 favorite 수 정보 요청
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => { // 요청한 정보는 response에 저장됨
                setFavoriteNumber(response.data.FavoriteNumber);
                if (response.data.success) {
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.');
                }
            });

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited);
                } else {
                    alert('정보를 가져오는데 실패 했습니다.');
                }
            });
    }, []);

    const onClickFavorite = () => {
        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        // Favorite 취소하면 Favorite 개수가 줄어듬
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited); // true를 false로, false를 true로
                    } else {
                        alert('Favorite 리스트에서 지우는 걸 실패 했습니다.');
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        // Favorite 누르면 Favorite 개수가 늘어남
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited); // true를 false로, false를 true로
                    } else {
                        alert('Favorite 리스트에서 추가하는 걸 실패 했습니다.');
                    }
                })
        }
    };

    return (
        <div>
            <Button onClick={onClickFavorite}>{ Favorited ? "Not Favorite" : "Add to Favorite" } {FavoriteNumber}</Button>
        </div>
    );
}

// export default Favorite;
export default withRouter(Favorite);