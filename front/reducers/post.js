export const initialState = {
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: "문건우"
      },
      content: "첫 번째 게시글",
      img:
        "https://i.pinimg.com/236x/ae/c9/ea/aec9eadd89aa51a9b753b221f3bcce12.jpg"
    }
  ],
  imagePaths: [],
};

const ADD_POST = "ADD_POST";
const ADD_DUMMY = "ADD_DUMMY";

export const addPost = {
  type: ADD_POST
};

export const addDummy = {
  type: ADD_DUMMY,
  data: {
    content: "Hello",
    UserId: 1,
    User: {
      nickname: "문건우"
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state
      };
    }
    case ADD_DUMMY: {
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts]
      };
    }
    default:
      return {
        ...state
      };
  }
};

export default reducer;
