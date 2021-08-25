import React, { useEffect } from 'react';
import { API_URL, API_KEY } from '../../Config';

function MovieDetail(props) {
    let movieId = 436969;
    //let movieId = props.match.params.movieId;

    useEffect(() => {
        console.log(props.match);
        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`);
    }, [input])

    return (
        <div>
            
        </div>
    )
}

export default MovieDetail;
