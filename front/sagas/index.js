import { all, call} from 'redux-saga/effects';
import user from './user';
import post from './post';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3065/api"; // 공통 부분 몰아주기
export default function* rootSaga() {
    yield all([
        call(user),
        call(post),
    ])
}