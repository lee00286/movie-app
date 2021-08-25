import {
    LOGIN_USER
} from '../_actions/types';

export default function (state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }; // payload는 action에서 받은 데이터
        default:
            return state;
    }
}