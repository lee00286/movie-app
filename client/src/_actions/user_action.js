import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataTosubmit) {
    const request = axios.post('/api/users/login', dataTosubmit)        // 입력한 로그인 정보를 서버에 보냄
        .then(response => response.data);                               // 서버에서 받은 데이터를 request에 저장

    return {
        type: LOGIN_USER,
        payload: request                                                // payload에 서버에서 받은 데이터 저장
    };                                                                  // payload를 Reducer에 보내서 다음 state를 만듬
};

export function registerUser(dataTosubmit) {
    const request = axios.post('/api/users/register', dataTosubmit)     // 입력한 로그인 정보를 서버에 보냄
        .then(response => response.data);                               // 서버에서 받은 데이터를 request에 저장

    return {
        type: REGISTER_USER,
        payload: request                                                // payload에 서버에서 받은 데이터 저장
    };                                                                  // payload를 Reducer에 보내서 다음 state를 만듬
};

export function auth() {
    const request = axios.get('/api/users/auth')                        // 입력한 로그인 정보를 서버에 보냄
        .then(response => response.data);                               // 서버에서 받은 데이터를 request에 저장

    return {
        type: AUTH_USER,
        payload: request                                                // payload에 서버에서 받은 데이터 저장
    };                                                                  // payload를 Reducer에 보내서 다음 state를 만듬
};