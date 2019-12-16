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
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN'; // 액션의 이름
export const LOG_OUT = 'LOG_OUT';

export const signUpAction = (data) =>  {
    return {
        type : SIGN_UP,
        data 
    };
};
export const loginAction = { // 실제 액션
    type : LOG_IN,
    data : {
        nickname : '문건우',
    },
};
export const logoutAction = {
    type: LOG_OUT
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case LOG_IN :{
            return {
                ...state,
                isLoggedIn : true,
                user: dummyUser
            };
        }
        case LOG_OUT : {
            return {
                ...state,
                isLoggedIn : false,
                user : null,
            };
        }
        case SIGN_UP : {
            return {
                ...state,
                signUpData : action.data,
            };
        }
        case SING_UP_ID : {
            return {
                ...state,
                signUpData : {
                    ...state.signUpData,
                    id : action.data,
                }
            }
        }
        case SING_UP_NICK : {
            return {
                ...state,
                signUpData : {
                    ...state.signUpData,
                    nick : action.data,
                }
            }
        }
        case SING_UP_PASSWORD : {
            return {
                ...state,
                signUpData : {
                    ...state.signUpData,
                    password : action.data,
                }
            }
        }
        default :
            return {
                ...state,
            }
    }
}

export default reducer;