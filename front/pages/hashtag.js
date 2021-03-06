import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({tag}) => {
    const { mainPosts, hasMorePost } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const onScroll = useCallback(() => {
        if ( window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
            if (hasMorePost) {
                dispatch({
                    type : LOAD_HASHTAG_POSTS_REQUEST,
                    lastId : mainPosts[mainPosts.length - 1].id,
                    data : tag
                })
            }
        }
    }, [hasMorePost,tag, mainPosts.length]);
    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [mainPosts.length]);
    return (
        <div>
            {mainPosts.map(c => (
                <PostCard key={c.id} post={c} />
            ))}
        </div>
    );
};

Hashtag.propTypes = {
    tag: PropTypes.string.isRequired,
}
Hashtag.getInitialProps = async (context) => { // next가 임의로 추가해준 lifecycle 최초의 작업 가능. 제일 처음 실행됨.
    const tag = context.query.tag;
    console.log('hashtag getInitialProps', tag);
    context.store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data : tag,
    })
    return { tag };
}; // 프론트에서도실행, 서버에서도 실행. 서버에서 어떤 데이터가 필요한지 받아와서 해야함.
// 서버쪽의 데이터를 미리 불러와서 프론트에서 그릴 수 있다.
// 서버사이드렌더리이 아니면 빈껍데기만 렌더링 되고나서 데이터를 불러오는데
// ssr은 데이터 있는 상태에서 렌더링.

export default Hashtag;