import React, { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { loginAction } from "../reducers/user";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  const onChangeId = useCallback(e => {
    setId(e.target.value);
  }, []);
  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);
  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch(loginAction);
    },
    [id, password]
  ); // 자식 컴포넌트에 넘기는 함수는 useCallback 으로 감싸준다.

  return (
    <Form onSubmit={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" required value={id} onChange={onChangeId} />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          required
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div style ={{marginTop: '10px'}}>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
