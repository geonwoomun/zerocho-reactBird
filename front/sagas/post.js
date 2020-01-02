import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
LOAD_MAIN_POSTS_FAILURE, LOAD_MAIN_POSTS_REQUEST, LOAD_MAIN_POSTS_SUCCESS,
LOAD_USER_POSTS_FAILURE, LOAD_USER_POSTS_REQUEST, LOAD_USER_POSTS_SUCCESS,
LOAD_HASHTAG_POSTS_FAILURE, LOAD_HASHTAG_POSTS_REQUEST, LOAD_HASHTAG_POSTS_SUCCESS,
LOAD_COMMENTS_FAILURE, LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS,
UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, UNLIKE_POST_REQUEST, UNLIKE_POST_FAILURE, UNLIKE_POST_SUCCESS, RETWEET_REQUEST, RETWEET_FAILURE, RETWEET_SUCCESS, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE } from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import axios from 'axios';

function addCommentApi(data) {
    return axios.post(`/post/${data.postId}/comment`, {content : data.content}, {
        withCredentials : true,
    });
}
function* addComment(action) {
    try {
        const result = yield call(addCommentApi, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data : {
                postId : action.data.postId,
                comment : result.data,
            },
        });
    }
    catch(e) {
        yield put({
            type : ADD_COMMENT_FAILURE,
            error : e
        })
    }
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function loadCommentsApi(postId) {
    return axios.get(`/post/${postId}/comments`);
}
function* loadComments(action) {
    try {
        const result = yield call(loadCommentsApi, action.data);
        yield put({
            type: LOAD_COMMENTS_SUCCESS,
            data : {
                postId : action.data,
                comments : result.data,
            },
        });
    }
    catch(e) {
        yield put({
            type : LOAD_COMMENTS_FAILURE,
            error : e
        })
    }
}

function* watchLoadComments() {
    yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}
function addPostAPI(postData) {
    return axios.post('/post', postData,{
        withCredentials : true,
    });
}
function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({ // post reducer의 데이터를 수정.
            type: ADD_POST_SUCCESS,
            data : result.data,
        });
        yield put({ // user reducer의 데이터를 수정
            type : ADD_POST_TO_ME,
            data : result.data.id,
        })
    }
    catch(e) {
        console.error(e);
        yield put({
            type : ADD_POST_FAILURE,
            error : e
        });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function loadMainPostsAPI(lastId = 0, limit = 10) {
    return axios.get(`/posts?lastId=${lastId}&limit=${limit}`);
}
function* loadMainPosts(action) {
    try {
        const result = yield call(loadMainPostsAPI, action.lastId);
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data : result.data,
        });
    }
    catch(e) {
        yield put({
            type : LOAD_MAIN_POSTS_FAILURE,
            error : e
        })
    }
}

function* watchMainLoadPosts() {
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

function loadHashtagPostsAPI(tag, lastId, limit=10) {
    return axios.get(`/hashtag/${encodeURIComponent(tag)}?offset=${lastId}&limit=${limit}`);
}
function* loadHashtagPosts(action) {
    try {
        const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data : result.data,
        });
    }
    catch(e) {
        yield put({
            type : LOAD_HASHTAG_POSTS_FAILURE,
            error : e
        })
    }
}

function* watchLoadHashtagPosts() {
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function loadUserPostsAPI(id) {
    return axios.get(`/user/${id || 0}/posts`);
}
function* loadUserPosts(action) {
    try {
        const result = yield call(loadUserPostsAPI, action.data);
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data : result.data,
        });
    }
    catch(e) {
        yield put({
            type : LOAD_USER_POSTS_FAILURE,
            error : e
        })
    }
}

function* watchLoadUserPosts() {
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function uploadImagesAPI(formdata) {
    return axios.post(`/post/images`, formdata, {
        withCredentials : true,
    });
}
function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data : result.data,
        });
    }
    catch(e) {
        yield put({
            type : UPLOAD_IMAGES_FAILURE,
            error : e
        })
    }
}

function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function likePostAPI(postId) {
    return axios.post(`/post/${postId}/like`, {}, {
        withCredentials : true,
    });
}
function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data : {
                postId : action.data,
                userId : result.data.userId
            },
        });
    }
    catch(e) {
        yield put({
            type : LIKE_POST_FAILURE,
            error : e
        })
    }
}

function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function unLikePostAPI(postId) {
    return axios.delete(`/post/${postId}/like`, {
        withCredentials : true,
    });
}
function* unLikePost(action) {
    try {
        const result = yield call(unLikePostAPI, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data : {
                postId : action.data,
                userId : result.data.userId
            },
        });
    }
    catch(e) {
        yield put({
            type : UNLIKE_POST_FAILURE,
            error : e
        })
    }
}

function* watchUnLikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

function retweetAPI(postId) {
    return axios.post(`/post/${postId}/retweet`, {}, {
        withCredentials : true,
    });
}
function* retweet(action) {
    try {
        const result = yield call(retweetAPI, action.data);
        yield put({
            type: RETWEET_SUCCESS,
            data : {
                postId : action.data,
                userId : result.data.userId
            },
        });
    }
    catch(e) {
        console.error(e);
        yield put({
            type : RETWEET_FAILURE,
            error : e
        });
        alert(e.response && e.response.data);
    }
}

function* watchRetweet() {
    yield takeLatest(RETWEET_REQUEST, retweet);
}

function removePostAPI(postId) {
    return axios.delete(`/post/${postId}`, {
        withCredentials : true,
    });
}
function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data : result.data,
        });
        yield put({
            type : REMOVE_POST_OF_ME,
            data : result.data,
        })
    }
    catch(e) {
        console.error(e);
        yield put({
            type : REMOVE_POST_FAILURE,
            error : e
        });
    }
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchMainLoadPosts),
        fork(watchAddComment),
        fork(watchLoadComments),
        fork(watchLoadHashtagPosts),
        fork(watchLoadUserPosts),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnLikePost),
        fork(watchRetweet),
        fork(watchRemovePost),
    ])
}