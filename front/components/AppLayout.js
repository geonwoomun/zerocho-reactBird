import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Row, Col } from 'antd';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const dummy = { // 서버로부터 아직 받은 데이터가 없기 때문에 가짜데이터를 만들어 놓자.
    nickname : '문건우',
    Post : [],
    Followings : [],
    Followers : [],
    isLoggedIn : false,
}
const AppLayout = ({children}) => { // props
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{verticalAlign : "middle"}} />
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {dummy.isLoggedIn
                     ? <UserProfile/>
                    :
                    <LoginForm/>
                    }
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <Link href="#"><a target="_blank">Made by mgw</a></Link>
                </Col>
            </Row>
        </div>
    )
};

AppLayout.propTypes = {
    children : PropTypes.node,
}

export default AppLayout;