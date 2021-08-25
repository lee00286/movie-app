import React, { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

function LandingPage(props) {
    // LandingPage에 들어오자마자 useEffect 실행
    useEffect(() => {
        axios.get('/api/hello') // 서버에 get reqeust 보냄; 엔드포인트
        .then(response => console.log(response.data)) // response를 콘솔창에 띄움
    }, [])

    // 로그아웃 버튼
    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success) {
                props.history.push("./login");
            } else {
                alert('로그아웃 하는데 실패 했습니다.');
            }
        });
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

// export default LandingPage
export default withRouter(LandingPage);