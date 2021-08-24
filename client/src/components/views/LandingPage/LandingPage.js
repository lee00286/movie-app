import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    // LandingPage에 들어오자마자 useEffect 실행
    useEffect(() => {
        axios.get('/api/hello') // 서버에 get reqeust 보냄; 엔드포인트
        .then(response => console.log(response.data)) // response를 콘솔창에 띄움
    }, [])

    return (
        <div>
            LangdingPage
        </div>
    )
}

export default LandingPage
