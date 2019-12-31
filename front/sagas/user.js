import { all, fork, delay, takeLatest,takeEvery, call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import {  LOG_OUT_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_SUCCESS, UNFOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAILURE, UNFOLLOW_USER_SUCCESS, UNFOLLOW_USER_REQUEST,FOLLOW_USER_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_FAILURE, LOAD_FOLLOWINGS_SUCCESS, REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_FAILURE, REMOVE_FOLLOWER_SUCCESS } from '../reducers/user';

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

function followAPI(userId) {
    // 서버에 요청을 보내는 부분분
    return axios.post(`/user/${userId}/follow`, {}, {
        withCredentials : true,
    });
}

function* follow(action) {
    try {
        const result = yield call(followAPI, action.data); 
        yield put({ 
            type: FOLLOW_USER_SUCCESS,
            data : result.data,
        });
    } catch (e) { 
        console.error(e);
        yield put({
            type: FOLLOW_USER_FAILURE,
            error : e
        })
    }
}

function* watchFollow() {
    yield takeEvery(FOLLOW_USER_REQUEST, follow)
}

function unfollowAPI(userId) {
    // 서버에 요청을 보내는 부분분
    return axios.delete(`/user/${userId}/follow`, {
        withCredentials : true,
    });
}

function* unfollow(action) {
    try {
        const result = yield call(unfollowAPI, action.data); 
        yield put({ 
            type: UNFOLLOW_USER_SUCCESS,
            data : result.data,
        });
    } catch (e) { 
        console.error(e);
        yield put({
            type: UNFOLLOW_USER_FAILURE,
            error : e
        })
    }
}

function* watchUnfollow() {
    yield takeEvery(UNFOLLOW_USER_REQUEST, unfollow)
}

function loadFollowersAPI(userId) {
    // 서버에 요청을 보내는 부분분
    return axios.get(`/user/${userId}/followers`, {
        withCredentials : true,
    });
}

function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data); 
        yield put({ 
            type: LOAD_FOLLOWERS_SUCCESS,
            data : result.data,
        });
    } catch (e) { 
        console.error(e);
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error : e
        })
    }
}

function* watchLoadFollowers() {
    yield takeEvery(LOAD_FOLLOWERS_REQUEST,loadFollowers)
}


function loadFollowingsAPI(userId) {
    // 서버에 요청을 보내는 부분분
    return axios.get(`/user/${userId}/followings`, {
        withCredentials : true,
    });
}

function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data); 
        yield put({ 
            type: LOAD_FOLLOWINGS_SUCCESS,
            data : result.data,
        });
    } catch (e) { 
        console.error(e);
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error : e
        })
    }
}

function* watchLoadFollowings() {
    yield takeEvery(LOAD_FOLLOWINGS_REQUEST,loadFollowings)
}

function removeFollowerAPI(userId) {
    // 서버에 요청을 보내는 부분분
    return axios.delete(`/user/${userId}/follower`, {
        withCredentials : true,
    });
}

function* removeFollower(action) {
    try {
        const result = yield call(removeFollowerAPI, action.data); 
        yield put({ 
            type: REMOVE_FOLLOWER_SUCCESS,
            data : result.data,
        });
    } catch (e) { 
        console.error(e);
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error : e
        })
    }
}

function* watchRemoveFollower() {
    yield takeEvery(REMOVE_FOLLOWER_REQUEST,removeFollower)
}


export default function* userSaga() {
    yield all([ //call fork는 둘다 함수를 실행해줌. call 동기호출 fork 비동기 호출출
        fork(watchLogIn), // 많은 액션들 사이에 순서가 없다. 사용자의 이벤트 클릭에 따라 작동.
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),  
        
        // 순서가 의미가 없으니깐 fork
    ]); // 사용자에 관한 리덕스 액션이 여러개면 all로 묶어서 다 넣어줘야함.
}