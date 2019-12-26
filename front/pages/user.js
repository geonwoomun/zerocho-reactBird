import React from 'react';
import PropTypes from 'prop-types';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { LOAD_USER_REQUEST } from '../reducers/user';

const User = ({ id }) => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector(state => state.post);
    const {userInfo} = useSelector(state => state.user);
    useEffect(() => { // 남의 정보 게시글을 가지고 와줘야함.
        dispatch({ // 이렇게 되면 시작 할때 해당 액션들을 실행해서 위에 있는 userInfo, mainPosts 들의 state값이 변경됨.
            type : LOAD_USER_REQUEST,
            data : id,
        })
        dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data : id,
        });
    }, []);
    return (
        <div>
            {userInfo ? 
            <Card
             actions={[
                 <div key="twit">
                     짹짹
                     <br/>
                     {userInfo.Posts}
                 </div>,
                 <div key="following">
                     팔로잉
                     <br/>
                     {userInfo.Followings}
                 </div>,
                 <div key="followers">
                     팔로잉
                     <br/>
                     {userInfo.Followers}
                 </div>,
             ]}
            >
                <Card.Meta 
                    avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                    title={userInfo.nickname}
                />
            </Card>
            : null}
            {mainPosts.map(c => (
                <PostCard key={+c.createAt} post={c} />
            ))}
        </div>
    );
};

User.propTypes = {
    id : PropTypes.number.isRequired
}

User.getInitialProps = async (context) => {
    console.log(context)
    console.log('hashtag getInitialProps', context.query.id);
    return { id: parseInt(context.query.id)} // props로 내려줄 수 있음.
}

export default User;