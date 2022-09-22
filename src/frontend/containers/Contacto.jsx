import React from 'react';

import { connect } from 'react-redux';

import Layout from '../components/layouts/Layout';
import Copy from '../components/forms/Input-copy';

const Contacto = ({ varsBingo }) => {
  return (
    <>
      <Layout to='/' title='Contacto'>
        <div className='noTengo'>
          <table className='bank__table'>
            <thead>
              <tr>
                <th className='th__start'> </th>
                <th className='th__end'>Contacto</th>
              </tr>
            </thead>
            <tbody>
              {
                varsBingo.contacto.map((e, index)=>{
                  return (
                    <Copy key={index} placeholder={e[0]}>
                      {e[1]}
                    </Copy>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

const mapDispatchToProps = (state)=>{
  return {
    varsBingo: state.vars,
  };
};

export default connect(mapDispatchToProps)(Contacto);
