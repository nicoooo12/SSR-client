import React from 'react';

import { connect } from 'react-redux';

import Layout from '../components/layouts/Layout';

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
                    <tr key={index}>
                      <td className='td__start'>{e[0]}</td>
                      <td className='td__end'>{e[1]}</td>
                    </tr>
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
