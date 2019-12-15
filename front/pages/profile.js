import React from "react";
import { Button, List, Card, Icon } from 'antd';
import NicknameEditForm from '../components/NicknameEditForm';

const dummy = { // 서버로부터 아직 받은 데이터가 없기 때문에 가짜데이터를 만들어 놓자.
  nickname : '문건우',
  Post : [],
  Followings : [],
  Followers : [],
  isLoggedIn : false,
}

const Profile = () => {
  return (
    <div>
      <NicknameEditForm />
      <List
        style={{ marginBottom : '20px'}}
        grid={{ gutter : 4, xs: 2, md: 3}}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{width : '100%'}}>더 보기</Button>}
        bordered
        dataSource={['문건우', '바보', '리액트버드오피셜']}
        renderItem={item => (
          <List.Item style={{marginTop : '20px'}}>
              <Card actions={[<Icon type="stop"/>]}>
                <Card.Meta description={item}/>
              </Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginBottom : '20px'}}
        grid={{ gutter : 4, xs: 2, md: 3}}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{width : '100%'}}>더 보기</Button>}
        bordered
        dataSource={['문건우', '바보', '리액트버드오피셜']}
        renderItem={item => (
          <List.Item style={{marginTop : '20px'}}>
              <Card actions={[<Icon type="stop"/>]}>
                <Card.Meta description={item}/>
              </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Profile;
