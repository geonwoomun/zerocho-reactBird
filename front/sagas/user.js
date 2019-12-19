import { all, fork, delay, takeLatest,takeEvery, call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import {  LOG_OUT_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../reducers/user';

function loginAPI() {
    // 서버에 요청을 보내는 부분분
    return axios.post('/login');
}

function* login() {
    try {
        // yield call(loginAPI); // 서버에 요청을 보내고 응답 받아야하니깐 call을 동기로 해야 기다림.
        yield delay(2000);
        yield put({ // put은 dispatch랑 동일. 성공했을 때
            type: LOG_IN_SUCCESS
        });
    } catch (e) { //loginAPI  에러 떴을 때
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE
        })
    }
}

function signUpAPI() {
    // 서버에 요청을 보내는 부분분
}

function* signUp() {
    try {
        // yield call(signUpAPI); // 서버에 요청을 보내고 응답 받아야하니깐 call을 동기로 해야 기다림.
        yield delay(2000);
        yield put({ // put은 dispatch랑 동일. 성공했을 때
            type: SIGN_UP_SUCCESS
        });
    } catch (e) { //loginAPI  에러 떴을 때
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error : e
        })
    }
}

function* watchLogin() {
    yield takeEvery(LOG_IN_REQUEST, login);
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp)
}

function* watchLogout() {
    while(true){
        yield take(LOG_OUT_REQUEST);
        yield put({
            type: LOG_IN_FAILURE,
        })
    }
}

export default function* userSaga() {
    yield all([ //call fork는 둘다 함수를 실행해줌. call 동기호출 fork 비동기 호출출
        fork(watchLogin), // 많은 액션들 사이에 순서가 없다. 사용자의 이벤트 클릭에 따라 작동.
        fork(watchLogout),
        fork(watchSignUp)  // 순서가 의미가 없으니깐 fork
    ]); // 사용자에 관한 리덕스 액션이 여러개면 all로 묶어서 다 넣어줘야함.
}