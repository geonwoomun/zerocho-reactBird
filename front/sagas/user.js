import { all, fork, delay, takeLatest,takeEvery, call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import {  LOG_OUT_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_SUCCESS } from '../reducers/user';

function loadUserAPI(userId) {
    // 서버에 요청을 보내는 부분분
    return axios.get(userId ? `/user/${userId}`:'/user',  {
        withCredentials: true,
    });
}

function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data); // 서버에 요청을 보내고 응답 받아야하니깐 call을 동기로 해야 기다림.
        yield put({ // put은 dispatch랑 동일. 성공했을 때
            type: LOAD_USER_SUCCESS,
            data : result.data,
            me : !action.data,
        });
    } catch (e) { //loginAPI  에러 떴을 때
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error : e
        })
    }
}

function* watchLoadUser() {
        yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function logOutAPI() {
    // 서버에 요청을 보내는 부분분
    return axios.post('/user/logout', {}, {
        withCredentials: true,
    });
}

function* logOut() {
    try {
        yield call(logOutAPI); // 서버에 요청을 보내고 응답 받아야하니깐 call을 동기로 해야 기다림.
        yield put({ // put은 dispatch랑 동일. 성공했을 때
            type: LOG_OUT_SUCCESS
        });
    } catch (e) { //loginAPI  에러 떴을 때
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error : e
        })
    }
}

function* watchLogOut() {
    yield takeEvery(LOG_OUT_REQUEST, logOut);
}



function logInAPI(loginData) {
    // 서버에 요청을 보내는 부분분
    return axios.post('/user/login', loginData, {
        withCredentials : true,
    });
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data); // 서버에 요청을 보내고 응답 받아야하니깐 call을 동기로 해야 기다림.
        yield put({ // put은 dispatch랑 동일. 성공했을 때
            type: LOG_IN_SUCCESS,
            data : result.data,
        });
    } catch (e) { //loginAPI  에러 떴을 때
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE
        })
    }
}

function* watchLogIn() {
    yield takeEvery(LOG_IN_REQUEST, logIn);
}

function signUpAPI(signUpData) {
    // 서버에 요청을 보내는 부분분
    return axios.post('/user/', signUpData);
}

function* signUp(action) {
    try {
        yield call(signUpAPI, action.data); // 서버에 요청을 보내고 응답 받아야하니깐 call을 동기로 해야 기다림.
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

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga() {
    yield all([ //call fork는 둘다 함수를 실행해줌. call 동기호출 fork 비동기 호출출
        fork(watchLogIn), // 많은 액션들 사이에 순서가 없다. 사용자의 이벤트 클릭에 따라 작동.
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchSignUp)  // 순서가 의미가 없으니깐 fork
    ]); // 사용자에 관한 리덕스 액션이 여러개면 all로 묶어서 다 넣어줘야함.
}