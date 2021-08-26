import React, { useState } from 'react'
import { useDispatch } from 'react-redux'           // Dispatch 연결
import { withRouter } from "react-router-dom";
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {
    const dispatch = useDispatch();
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    
    // State
    const [Email, setEmail]= useState("");          // Email을 위한 State
    const [Password, setPassword] = useState("");   // Password를 위한 State

    // Function
    const onEmailHandler = (event) => {             // Email 입력창을 위한 Function
        setEmail(event.currentTarget.value);
    };
    const onPasswordHandler = (event) => {          // Password 입력창을 위한 Function
        setPassword(event.currentTarget.value);
    };
    const onSubmitHandler = (event) => {            // Login 버튼을 위한 Function
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('/');         // 리액트에서 페이지 이동을 할 때 props를 사용함 ('/'는 root page)
                } else {
                    alert("Error");
                }
            });
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

// export default LoginPage
export default withRouter(LoginPage);