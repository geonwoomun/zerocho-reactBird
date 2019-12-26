const dummyUser = {
    nickname : '문건우',
    Post : [],
    Followings : [],
    Followers : [],
    id : 1,
}
export const initialState = {
    isLoggingOut : false, // 로그아웃 시도중
    isLoggingIn : false, // 로그인 시도중
    logInErrorReason : '', // 로그인 실패 사유
    signedUp: false, // 회원가입성공
    isSigningUp : false, //  회원가입 시도중
    signUpErrorReason : '', // 회원가입 실패 사유
    me : null, // 내정보
    userInfo : null, // 남의 정보
    followingList : [], // 팔로잉 리스트
    followerList : [], // 팔로워 리스트트
};
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; // 액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'; // 서버쪽에 갔다 와야 하는 비동기 액션
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'; 
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST'; 
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST'; 
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST'; 
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

// 동기요청은 REQUEST, SUCCESS, FAILURE 필요없고

const reducer = (state = initialState, action) => {
    switch (action.type){
        case LOG_IN_REQUEST :{
            return {
                ...state,
                logInErrorReason : ''
            };
        }
        case LOG_IN_SUCCESS:{
            return {
                ...state,
                isLoggingIn : false,
                me : action.data,
                isLoading : false,
            }
        }
        case LOG_IN_FAILURE : {
            return {
                ...state,
                logInErrorReason : action.error,
                me : null,
            };
        }
        case LOG_OUT_REQUEST : {
            return {
                ...state,
                isLoggingOut : true
            };
        }
        case LOG_OUT_SUCCESS :{
            return {
                ...state,
                isLoggingOut : false,
                me : null,
            }
        }
        case LOG_OUT_FAILURE :{
            return state;
        }
        case SIGN_UP_REQUEST : {
            return {
                ...state,
                isSigningUp : true,
                isSignedUp : false,
                signUpErrorReason : '',
            };
        }
        case SIGN_UP_SUCCESS : {
            return {
                ...state,
                isSigningUp : false,
                isSignedUp : true,
            };
        };
        case SIGN_UP_FAILURE : {
            return {
                ...state,
                isSigningUp : false,
                signUpErrorReason : action.error,
            };
        };
        case LOAD_USER_REQUEST : {
            return {
                ...state,
            };
        }
        case LOAD_USER_SUCCESS : {
            if (action.me){
                return {
                    ...state,
                    me : action.data,
                };
            }
            return {
                ...state,
                userInfo : action.data
            }
            
        };
        case LOAD_USER_FAILURE : {
            return state;
        };
        default :
            return {
                ...state,
            }
    }
}

export default reducer;