import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

// eslint-disable-next-line react/prop-types
const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTyeps = {
  Component: PropTypes.elementType.isRequired,
};

export default NodeBird;
