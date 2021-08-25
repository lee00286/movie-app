import React, { useState } from 'react'
import { useDispatch } from 'react-redux'           // Dispatch 연결
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { loginUser, registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
    const dispatch = useDispatch();
    
    // State
    const [Email, setEmail]= useState("");          // Email을 위한 State
    const [Name, setName] = useState("");           // Name을 위한 State
    const [Password, setPassword] = useState("");   // Password를 위한 State
    const [ConfirmPassword, setConfirmPassword] = useState("");           // ConfirmPassword을 위한 State

    // Function
    const onEmailHandler = (event) => {             // Email 입력창을 위한 Function
        setEmail(event.currentTarget.value);
    };
    const onNameHandler = (event) => {              // Name 입력창을 위한 Function
        setName(event.currentTarget.value);
    };
    const onPasswordHandler = (event) => {          // Password 입력창을 위한 Function
        setPassword(event.currentTarget.value);
    };
    const onConfirmPasswordHandler = (event) => {          // ConfirmPassword 입력창을 위한 Function
        setConfirmPassword(event.currentTarget.value);
    };
    const onSubmitHandler = (event) => {            // Login 버튼을 위한 Function
        event.preventDefault();

        // 비밀번호와 비밀번호 확인 input이 같은지 확인
        if(Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) {
                    props.history.push('/login');         // 리액트에서 페이지 이동을 할 때 props를 사용함
                } else {
                    alert("Failed to sign up");
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
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    )
}

// export default RegisterPage
export default withRouter(RegisterPage);
