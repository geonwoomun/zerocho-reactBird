import React from "react"; // next에서는 안 써도 되지만 useState 등을 사용하기 위해서 어차피 써야함.
// 넥스트의 링크 기능
// 라우터는 그냥 pages의 파일 구조만으로 자동으로 된다.
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
const dummy = {
    isLoggedIn : true,
    imagePaths : [],
    mainPosts : [{
        User:{
            id: 1,
            nickname : '문건우',
        },
        content : '첫 번째 게시글',
        img : 'https://i.pinimg.com/236x/ae/c9/ea/aec9eadd89aa51a9b753b221f3bcce12.jpg',
    }],
}
const Home = () => {
    return (
        <div>
            {dummy.isLoggedIn && <PostForm/>}
                {dummy.mainPosts.map((c) => {
                    return (
                        <PostCard key={c} post={c}/>
                    )
                })}
        </div>
    );
};

export default Home;