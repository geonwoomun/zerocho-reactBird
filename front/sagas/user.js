import { all, fork, takeLatest,takeEvery, call, put, take } from 'redux-saga/effects';
import {  LOG_OUT_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST } from '../reducers/user';

function loginAPI() {
    // 서버에 요청을 보내는 부분분
}

function* login() {
    try {
        yield call(loginAPI); // 서버에 요청을 보내고 응답 받아야하니깐 call을 동기로 해야 기다림.
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

function* watchLogin() {
    yield takeEvery(LOG_IN_REQUEST, login);
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
        fork(watchLogout),  // 순서가 의미가 없으니깐 fork
    ]); // 사용자에 관한 리덕스 액션이 여러개면 all로 묶어서 다 넣어줘야함.
}