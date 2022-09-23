import React, { useEffect, useState } from 'react';
import Layout from '../../components/layouts/Layout';

import { connect } from 'react-redux';
import { getAdminVars, terminarOrden } from '../../actions';
// import { Link } from 'react-router-dom';
import Input from '../../components/forms/Input';
import Copy from '../../components/forms/Input-copy';
import Button from '../../components/forms/Button';
import Alert from '../../utils/Alert';

import { useParams } from 'react-router-dom';

const Metrics = ({ history, socket, user, getAdminVars, terminarOrden }) => {
  const { id } = useParams();
  const totalPagado = React.createRef(totalPagado);
  const message = React.createRef(message);

  const getOrdenes = () => {
    getAdminVars((w)=>{
      console.log(w);
      const e = w.filter((t)=>{
        return t.user === id;
      })[0];
      setOrden(e);
    }, ()=>{
      Alert('Ocurrió un error');
    });
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

  const [orden, setOrden] = useState([]);
  // useEffect(()=>{
  //   console.log(ordenes);
  // }, ordenes);

  const clickHandler = () => {
    terminarOrden(
      orden.user,
      totalPagado.current.children[0].value,
      message.current.children[0].value,
      (e)=>{
        history.push('/admin/metrics');
      },
      ()=>{

      },
    );
  };

  return (
    <>
      <Layout to='/admin/metrics' title='Métricas'>
        <div className='noTengo'>
          <h1>Orden</h1>
          {
            orden ?
              <>
                {
                  orden.canvasUrl ?
                    <a href={orden.imgUrl} target='_blank' rel='noopener noreferrer'>Ver Comprobante</a> :
                    <>Aún no sube comprobante</>
                }
                <Copy placeholder='username' >{orden.username}</Copy>
                <Copy placeholder='username' >{orden.fecha ? new Date(orden.fecha) : ''}</Copy>
                <Copy placeholder='estado' >{orden.estado === 2 ? 'Iniciada' : 'En revisión'}</Copy>
                <Copy placeholder='total a pagar' >{orden.totalPago}</Copy>
                <Input Ref={totalPagado} placeholder='total pagado' />
                <Input Ref={message} placeholder='mensaje' value='todo bien'/>
                <Button onClick={clickHandler}>Confirmar compra</Button>
              </> : <>No existe</>
          }
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

const mapDispatchToProps = {
  getAdminVars,
  terminarOrden,
};

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
