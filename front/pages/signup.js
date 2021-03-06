import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

const Signup = () => {
    const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);
    const { isSigningUp, me } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (me){
            alert('로그인 했으니 메인페이지로 돌아갑니다.');
            Router.push('/');
        }
    },[me && me.id])

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (password !== passwordCheck){
            return setPasswordError(true);
        }
        if (!term){
            return setTermError(true);
        }
        dispatch({
            type : SIGN_UP_REQUEST,
            data :{
            userId : id,
            password,
            nickname : nick,
        }});
    }, [id, nick, password, passwordCheck, term]); // [] 안에 있는 dependencies들이 바뀔 때 다시 생성.
    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    },[])
    const onChangeNick = useCallback((e) => {
        setNick(e.target.value);
    },[])
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    },[])
    const onChangePasswordChk = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    },[password])
    const onChangeTerm = useCallback((e) => {
        setTermError(false)
        setTerm(e.target.checked)
    },[]);

    if (me) {
        return null;
    }
    return (
        <>
            <Form onSubmit={onSubmit} style={{padding : 10}}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value = {id} required onChange ={onChangeId}/>
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input name="user-nick" value = {nick} required onChange ={onChangeNick}/>
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" value = {password} type ="password" required onChange ={onChangePassword}/>
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <br />
                    <Input name="user-password-check" value = {passwordCheck}  type ="password" required onChange ={onChangePasswordChk}/>
                    {passwordError && <div style ={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <Checkbox name="user-term" onChange={onChangeTerm}>약관에 동의하십니까?</Checkbox>
                    {termError && <div style = {{color : 'red'}}>약관에 동의하셔야합니다.</div>}
                </div>
                <div style={{marginTop : 10}}>
                    <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
                </div>
            </Form>
    </>
    );
};

export default Signup;