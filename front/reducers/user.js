const dummyUser = {
    nickname : '문건우',
    Post : [],
    Followings : [],
    Followers : [],
}
export const initialState = {
    isLoggedIn : false,
    user : {},
    signUpData : {
        id : '',
        nick : '',
        password : '',
    }
};
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; // 액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'; // 서버쪽에 갔다 와야 하는 비동기 액션
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'; 
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
// 동기요청은 REQUEST, SUCCESS, FAILURE 필요없고
export const signUpAction = (data) =>  {
    return {
        type : SIGN_UP_REQUEST,
        data 
    };
};
export const loginAction = { // 실제 액션
    type : LOG_IN_REQUEST,
    data : {
        nickname : '문건우',
    },
};
export const logoutAction = {
    type: LOG_OUT_REQUEST
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case LOG_IN_REQUEST :{
            return {
                ...state,
                loginData : action.data,
                isLoading : true,
            };
        }
        case LOG_IN_SUCCESS:{
            return {
                ...state,
                isLoggedIn : true,
                user : dummyUser,
                isLoading : false,
            }
        }
        case LOG_OUT_REQUEST : {
            return {
                ...state,
                isLoggedIn : false,
                user : null,
            };
        }
        case LOG_IN_FAILURE : {
            return {
                ...state,
                isLoggedIn : false,
                isLoggedIn : false,
                logInErrorReason : action.error,
                me : null,
            };
        }
        case SIGN_UP_REQUEST : {
            return {
                ...state,
                signUpData : action.data,
            };
        }
        default :
            return {
                ...state,
            }
    }
}

export default reducer;