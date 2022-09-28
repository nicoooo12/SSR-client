import React, { useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import Button from '../../components/forms/Button';

import { connect } from 'react-redux';

const Play = ({ user, socket, catalogo }) => {

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
          <h1>Control - Catalogo</h1>
          {
            catalogo?.map((e)=>{
              return (
                <>
                  <div>
                    <p>{e.titulo} - </p>
                    {/* <div /> */}
                    <Button size={'small'} typebutton={e.enVenta ? 'primary' : 'secondary'} disabled={!!e.enVenta}>Abrir</Button>
                    <Button size={'small'} typebutton={e.enVenta ? 'secondary' : 'primary'} disabled={!e.enVenta}>Cerrar</Button>
                  </div>
                </>
              );
            })
          }
        </div>
        <div className='noTengo'>
          <h1>Control - Juego</h1>
        </div>
        <div className='noTengo'>
          <h1>Validar cartones</h1>
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = (state)=>{
  return {
    user: state.user,
    catalogo: state.catalogos,
  };
};

export default connect(mapStateToProps, null)(Play);
