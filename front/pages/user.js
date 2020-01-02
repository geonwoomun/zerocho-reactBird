import React from "react";
import PropTypes from "prop-types";
import { LOAD_USER_POSTS_REQUEST } from "../reducers/post";
import { useSelector } from "react-redux";
import { Avatar, Card } from "antd";
import { LOAD_USER_REQUEST } from "../reducers/user";
import PostCard from "../components/PostCard";

const User = () => {
  const { mainPosts } = useSelector(state => state.post);
  const { userInfo } = useSelector(state => state.user);
  return (
    <div>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="followers">
              팔로잉
              <br />
              {userInfo.Followers}
            </div>
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map(c => (
        <PostCard key={c.id} post={c} />
      ))}
    </div>
  );
};

User.propTypes = {
  id: PropTypes.number.isRequired
};

User.getInitialProps = async context => {
  const id = parseInt(context.query.id);
  console.log("hashtag getInitialProps", id);
  context.store.dispatch({
      // 이렇게 되면 시작 할때 해당 액션들을 실행해서 위에 있는 userInfo, mainPosts 들의 state값이 변경됨.
      type: LOAD_USER_REQUEST,
      data: id
  });
  context.store.dispatch({
    // 이렇게 되면 시작 할때 해당 액션들을 실행해서 위에 있는 userInfo, mainPosts 들의 state값이 변경됨.
    type: LOAD_USER_POSTS_REQUEST,
    data: id
});
  
  return { id }; // props로 내려줄 수 있음.
};

export default User;
