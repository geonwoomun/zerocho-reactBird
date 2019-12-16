import React, { useEffect } from "react"; // next에서는 안 써도 되지만 useState 등을 사용하기 위해서 어차피 써야함.
// 넥스트의 링크 기능
// 라우터는 그냥 pages의 파일 구조만으로 자동으로 된다.
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from '../reducers/user';

const Home = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn); // 잘게 쪼개는게 리렌더링을 최소화 할 수 있음.
    const user = useSelector(state => state.user.user); // 너무 잘게 쪼개면 줄 수가 너무 많아지니깐 적당히......
    const { mainPosts } = useSelector(state => state.post);

    useEffect(() => {
        dispatch(loginAction);
        dispatch(logoutAction);
        dispatch(loginAction);
        dispatch(logoutAction);
    }, [])
    return (
        <div>
            {isLoggedIn ? <div>로그인 했습니다 : {user.nickname}</div> : <div>로그아웃 했습니다.</div>}
            {isLoggedIn && <PostForm/>}
                {mainPosts.map((c) => {
                    return (
                        <PostCard key={c} post={c}/>
                    )
                })}
        </div>
    );
};

export default Home;