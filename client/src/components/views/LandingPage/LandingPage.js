import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

function LandingPage() {
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);

    useEffect(() => {
         // Get Movie Page
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetch(endpoint) // 인기있는 영화를 가져옴
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setMovies([response.results]);
            setMainMovieImage(response.results[0]);
        }); // response는 20개의 인기있는 영화를 저장함

    }, []);

    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/* Main Image */}
            {MainMovieImage && /* MainMovieImage가 있으면 아래의 코드 실행 */
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>Load More</button>
            </div>
        </div>
    )
}

// export default LandingPage
export default withRouter(LandingPage);