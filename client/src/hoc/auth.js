import axios from 'axios';
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

// option:
// null => 아무나 출입이 가능한 페이지
// true => 로그인한 유저만 출입이 가능한 페이지
// false => 로그인한 유저는 출입이 불가능한 페이지
export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response);
                if(!response.payload.isAuth) {                      // 로그인하지 않은 상태
                    if(option) {                                    // option이 true가 아닐 때
                        props.history.push('/login');
                    }
                } else { // 로그인한 상태
                    if(adminRoute && !response.payload.isAdmin) {   // 관리자가 아닌 유저가 관리자 페이지에 접근할 때
                        props.history.push('/');
                    } else {
                        if(option === false) {                      // 로그인한 유저는 출입이 불가능한 페이지
                            props.history.push('/');
                        }
                    }
                }
            });
        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck;
}