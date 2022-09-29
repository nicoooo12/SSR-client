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
              <div key={i} className='entrada'>
                <div className='entrada_top'>
                  <div>
                    <div>
                      <p>{varBingo.title}</p>
                      <p>{varBingo.subTitle}</p>

                    </div>
                    <p>{varBingo.fecha}</p>
                  </div>
                  <div>
                    <img src='https://api.qrserver.com/v1/create-qr-code/?size=249x249&data=https://bingoloteando.herokuapp.com/' alt='' />
                    <div>
                      <p>{user.email}</p>
                      <p>{user.id}-{i}</p>
                    </div>
                  </div>
                </div>
                <div className='entrada_bottom'>
                  <p>{varBingo.title}</p>
                  <p>{varBingo.subTitle}</p>
                  <p>{varBingo.fecha}</p>
                  <p>{user.email}</p>
                  <p>{user.id}-{i}</p>
                  <img src='https://api.qrserver.com/v1/create-qr-code/?size=249x249&data=https://bingoloteando.herokuapp.com/' alt='' />
                </div>
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
