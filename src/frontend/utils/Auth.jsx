import React from 'react';

const Auth = ({ children }) => {
  // if (user.id) {
  //   const isAdmin = document.cookie ? document.cookie.match(/isAdmin=([a-z0-9]*);/)[1] : false;
  //   if (isAdmin === 'false') {
  //     history.push('/');
  //   }
  // } else {
  //   history.push('/');
  // }

  return (
    <>
      {children}
    </>
  );
};

export default Auth;
