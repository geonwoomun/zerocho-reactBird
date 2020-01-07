//html의 역할
// 기본적으로 넣어주지만 helmet을 ssr을 하기 위해선 직접 수정을 해줘야함.
// 아직 함수 컴포넌트로는 안된다.

import React from 'react';
import Document, {Main, NextScript} from 'next/document';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { ServerStyleSheet } from 'styled-components';


class MyDocument extends Document {
    static getInitialProps(context) {
        const sheet = new ServerStyleSheet();
        const page = context.renderPage((App) => (props) => sheet.collectStyles(<App {...props}/>));
        const styleTags = sheet.getStyleElement();
        return { ...page, helmet : Helmet.renderStatic(), styleTags }
    }
    render() {
        const { htmlAttributes, bodyAttributes, ...helmet} = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();
        return (
            <html {...htmlAttrs}>
                <head>
                    {this.props.styleTags}
                    {Object.values(helmet).map(el => el.toComponent())}
                </head>
                <body {...bodyAttrs}>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        );
    }
}

MyDocument.propTypes = {
    helmet: PropTypes.object.isRequired,
    styleTags : PropTypes.object.isRequired,
}
export default MyDocument;
