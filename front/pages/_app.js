// _app.js로 만들면 자동으로 레이아웃이 된다.
import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import PropTypes from 'prop-types';

const ReactBird = ({ Component }) => {
    return (
        <>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css"/>
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        </>
    )
}

ReactBird.propTypes = {
    Component : PropTypes.elementType,
}
export default ReactBird;