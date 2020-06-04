import React from 'react';

const AppLayout = ({ children }) => {
  return (
    <>
      <header>유저 레이아웃 입니다.</header>
      <main>{children}</main>
      <footer>푸터입니다.</footer>
    </>
  );
};

export default AppLayout;
