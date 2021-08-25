import { combineReducers } from "redux";
import user from './user_reducer';

// 다양한 Reducer을 합쳐줌
const rootReducer = combineReducers({
    user
});

export default rootReducer;