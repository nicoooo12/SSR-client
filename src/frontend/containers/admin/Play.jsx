import React, { useEffect } from 'react';
import Layout from '../../components/layouts/Layout';

import { connect } from 'react-redux';

const Play = ({ user }) => {

  useEffect(()=>{
    socket.removeAllListeners();
    socket.emit('admin');
    socket.on('change', ()=>{
      updateState();
    });
    socket.on(user?.id ? user.id : 'change-noSignIn', ()=>{
      updateState();
    });
  }, []);

  return (
    <>
      <Layout to='/admin' title='Juego'>
        <div className='noTengo'>
          <h1>test</h1>
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = (state)=>{
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Play);
