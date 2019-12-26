// _app.js로 만들면 자동으로 레이아웃이 된다.
// 그냥 react에 redux 붙이는거랑 next에 redux 붙이는게 달라서 
// next에는 next-redux-wrapper를 설치해줘야함.
import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const ReactBird = ({ Component, store, pageProps }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css"/>
            </Head>
            <AppLayout>
                <Component {...pageProps}/>
            </AppLayout>
        </Provider>
    )
}

ReactBird.propTypes = {
    Component : PropTypes.elementType.isRequired,
    store : PropTypes.object.isRequired,
    pageProps : PropTypes.object.isRequired,
};

ReactBird.getInitialProps = async (context) => { // next에서 제공하는 젤처음 실행하는 라이프사이클
    console.log(context);
    const { ctx, Component } = context; // context안에 많은 정보들이 들어가 있음.
    let pageProps = {};
    if (Component.getInitialProps) { // 컴포넌트들 중에 getInitailProps가 있을 때 실행
        pageProps = await Component.getInitialProps(ctx); // 만들어둔 Component의 함수에 ctx를 전달 해서 실행
    } // 리턴 한 값이 pageProps에 담기고 다시 리턴 하면 ReactBird의 props로 담기고 컴포넌트에 props로 내려줌.
    return { pageProps };
};
export default withRedux((initialState, options )=> {
    const sagaMiddleware = createSagaMiddleware();
    // 여기에다가 store 커스터마이징.
    const middlewares = [sagaMiddleware]; // 변조하거나 기능을 추가.
    const enhancer = compose(applyMiddleware(...middlewares),
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : 
    (f) => f); // compose : 미들웨어끼리 합성,  applyMiddleware 미들웨어 적용
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga); // 루트사가 연결
    return store; // store를 props로 받을 수 있음.
})(ReactBird);