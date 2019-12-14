import React from "react"; // next에서는 안 써도 되지만 useState 등을 사용하기 위해서 어차피 써야함.
import { Form, Input, Button, Avatar, Card, Icon } from "antd";
// 넥스트의 링크 기능
// 라우터는 그냥 pages의 파일 구조만으로 자동으로 된다.

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
            {dummy.isLoggedIn && <Form encType = "multipart/form-data">
                    <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?"></Input.TextArea>
                    <div>
                        <input type="file" multiple hidden></input>
                        <Button>이미지 업로드</Button>
                        <Button type="primary" style={{float : 'right'}} htmlType="submit">짹짹</Button>
                    </div>
                    <div>
                        {dummy.imagePaths.map((v,i) => {
                            return (
                                <div key={v} style={{display: 'inline-block'}}>
                                    <img src={`http://localhost:3065/` + v} style={{width: '200px'}} alt={v}/>
                                    <div>
                                        <Button>제거</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Form>}
                {dummy.mainPosts.map((c) => {
                    return (
                        <Card
                        key = {+c.createCat}
                        cover={c.img && <img alt="example" src={c.img} />}
                        actions ={[
                            <Icon type="retweet" key="retweet"/>,
                            <Icon type="heart" key="heart"/>,
                            <Icon type="message" key="message"/>,
                            <Icon type="ellipsis" key="ellipsis"/>,
                        ]}
                        extra={<Button>팔로우</Button>}
                        >
                            <Card.Meta
                            avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
                            title={c.User.nickname}
                            description={c.content}/>
                        </Card>
                    )
                })}
        </div>
    );
};

export default Home;