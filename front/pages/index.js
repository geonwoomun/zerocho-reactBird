import React, { useEffect } from "react"; // next에서는 안 써도 되지만 useState 등을 사용하기 위해서 어차피 써야함.
// 넥스트의 링크 기능
// 라우터는 그냥 pages의 파일 구조만으로 자동으로 된다.
import { useDispatch, useSelector } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post";


const Home = () => {
    const me = useSelector(state => state.user.me); // 너무 잘게 쪼개면 줄 수가 너무 많아지니깐 적당히......
    const { mainPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();
    
    const onScroll = () => {
        if ( window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
            dispatch({
                type : LOAD_MAIN_POSTS_REQUEST,
                lastId : mainPosts[mainPosts.length - 1].id,
            })
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [mainPosts.length]);

    return (
        <div>
            {me ? <div>로그인 했습니다 : {me.nickname}</div> : <div>로그아웃 했습니다.</div>}
            {me && <PostForm/>}
            {mainPosts.map((c) =>(
                    <PostCard key={c.id} post={c}/>
                )
            )}
        </div>
    );
};

Home.getInitialProps = async (context) => {
    context.store.dispatch({
        type : LOAD_MAIN_POSTS_REQUEST,
    })
}

export default Home;