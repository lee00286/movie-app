import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import GridCards from '../commons/GridCards'; // Grid import
import { Row } from 'antd'; // AntDesign에서 import

function MovieDetail(props) {
    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        // 영화 정보
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        // 등장인물 정보
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setMovie(response);
            });

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast);
            });
    }, [])

    // Toggle Actor View 버튼을 눌러야만 cast가 보이는 함수
    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    };

    return (
        <div>
            {/* Header */}
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                title={Movie.original_title}
                text={Movie.overview}
            />

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                {/* Favorite Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                {/* Movie Info */}
                <MovieInfo 
                    movie={Movie}
                />
                <br />
                {/* Actors Grid - AntDesign 사용 */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>

                {ActorToggle && 
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    landingPage
                                    image={cast.profile_path ? /* 이 정보가 없는 경우 따로 처리 */
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }
            </div>
        </div>
    )
}

// export default MovieDetail;
export default withRouter(MovieDetail);
