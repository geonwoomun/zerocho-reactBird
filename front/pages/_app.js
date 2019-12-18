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

const ReactBird = ({ Component, store }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css"/>
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        </Provider>
    )
}

ReactBird.propTypes = {
    Component : PropTypes.elementType.isRequired,
    store : PropTypes.object.isRequired,
}
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