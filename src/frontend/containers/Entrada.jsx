import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/layouts/Layout';
import '../assets/styles/components/Entradas.scss';
const Entrada = ({ entrada, user, varBingo }) => {
  return (
    <>
      <Layout to='/' title='Entrada'>
        {
          entrada?.map((e, i)=>{
            return (
              <div className='noTengo' key={i}>
                <h1>
                  {user.name}
                </h1>
                <img src='https://api.qrserver.com/v1/create-qr-code/?size=249x249&data=https://bingoloteando.herokuapp.com/admin/entrada/' alt='' />
                <br />
                <p>{e.use ? 'Ocupada' : 'Habilitada'}</p>
              </div>
            );
          })
        }
      </Layout>
    </>
  );
};

const mapDispatchToProps = (state)=>{
  return {
    entrada: state.entrada,
    user: state.user,
    varBingo: state.vars,
  };
};

export default connect(mapDispatchToProps)(Entrada);
