import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    // LandingPage에 들어오자마자 useEffect 실행
    useEffect(() => {
        axios.get('/api/hello') // 서버에 get reqeust 보냄; 엔드포인트
        .then(response => console.log(response.data)) // response를 콘솔창에 띄움
    }, [])

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
        </div>
    )
}

export default LandingPage
