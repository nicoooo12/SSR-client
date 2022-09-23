import React from 'react';
import { connect } from 'react-redux';
import { logoutRequest } from '../actions';

const Auth = ({ logoutRequest, user, login, admin, children, ...props }) => {
  if (login) {
    // console.log('hola? ', user);

    // if (
    //   document.cookie.match(/token=([a-zA-Z.\-0-9]*)([;]|$)/g) &&
    //   (
    //     document.cookie.match(/token=([a-zA-Z.\-0-9]*)([;]|$)/g)[0] === 'token=;' ||
    //     document.cookie.match(/token=([a-zA-Z.\-0-9]*)([;]|$)/g)[0] === 'token='
    //   )
    // ) {
    //   props.history.push(`/sign-in?redirect=${props.history.location.pathname}`);
    // }
    if (!user.id) {
      props.history.push(`/sign-in?redirect=${props.history.location.pathname}`);
      // props.history.push('/');
    }
  }

  if (admin) {
    console.log('hola? ', user);
    // const isAdmin = document.cookie.match(/isAdmin=([a-z0-9]*)([;]|$)/g) ? document.cookie.match(/isAdmin=([a-z0-9]*)([;]|$)/g)[1] : false;
    if (!user.admin) {
      props.history.push('/');
    }
  }

  // if (user.id) {
  //   const isAdmin = document.cookie ? document.cookie.match(/isAdmin=([a-z0-9]*);/)[1] : false;
  //   if (isAdmin === 'false') {
  //     history.push('/');
  //   }
  // } else {
  //   history.push('/');
  // }

  const Children = React.Children.map(children, (child, index)=>
    React.cloneElement(child, { ...child.props, ...props }));

  return (
    <>
      {Children}
    </>
  );
};

const mapStateToProps = (state)=>{
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
