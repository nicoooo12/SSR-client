import React, { useEffect, useState } from 'react';
import Layout from '../../components/layouts/Layout';

import { connect } from 'react-redux';
import { getAdminVars } from '../../actions';
import { Link } from 'react-router-dom';
import numberWithCommas from '../../utils';

const Metrics = ({ socket, user, getAdminVars, varsBingo }) => {

  const getOrdenes = () => {
    getAdminVars((e)=>{
      console.log(e);
      setData(e);
    }, ()=>{});
  };

  useEffect(()=>{
    socket.removeAllListeners();
    socket.emit('admin');
    socket.on('change', ()=>{
      getOrdenes();
    });
    socket.on(user?.id ? user.id : 'change-noSignIn', ()=>{
      updateState();
    });
    getOrdenes();
  }, []);

  const [data, setData] = useState([]);

  return (
    <>
      <Layout to='/admin' title='Métricas'>
        <div className='noTengo'>
          <h1>Bingo</h1>
          <p>Dinero Total Recaudado: <b>{varsBingo.simbolo}{numberWithCommas(data.recaudado ? data.recaudado * varsBingo.cambio : 0)} {varsBingo.moneda}</b></p>
          <p>Códigos canjeados: <b>{data?.codesCanjeados}</b></p>
          <p>Ordenes Terminadas: <b>{data?.totalOrdenesTerminadas}</b></p>
          <p>Cartones comprados: <b>{data?.cartonesComprados - data?.codesCanjeados * 3}</b></p>
          <p>Cartones canjeados: <b>{data?.codesCanjeados * 3}</b></p>
          <p>Cartones totales: <b>{data.cartonesComprados}</b></p>
        </div>
        <div className='noTengo'>
          <h1>Ordenes</h1>
          <table className='' style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ borderBottom: 'solid 2px #EFF0F6' }}>
              <tr>
                <th style={{ padding: '0.5rem 0.5rem' }}>username</th>
                <th style={{ padding: '0.5rem 0.5rem' }}>fecha</th>
                <th style={{ padding: '0.5rem 0.5rem' }}>estado</th>
                <th style={{ padding: '0.5rem 0.5rem' }}> </th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {
                data.ordenes?.map((e, index)=>{
                  return (
                    <>
                      <tr key={index}>
                        <td style={{ padding: '0.5rem 0.5rem' }}>{e?.username}</td>
                        <td style={{ padding: '0.5rem 0.5rem' }}>{new Date(e?.fecha).toString()}</td>
                        <td style={{ padding: '0.5rem 0.5rem' }}>{e?.estado === 2 ? 'Iniciada' : 'En revisión'}</td>
                        <td style={{ padding: '0.5rem 0.5rem' }}>
                          <Link to={`/admin/metrics/${e?.user}`}>Editar</Link>
                        </td>
                      </tr>
                    </>
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

const mapStateToProps = (state)=>{
  return {
    user: state.user,
    varsBingo: state.vars,
  };
};

const mapDispatchToProps = {
  getAdminVars,
};

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
