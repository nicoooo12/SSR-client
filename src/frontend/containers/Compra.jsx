import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Pageination from '../components/forms/Pageination';
import { statusNextCarrito, setStatusCarrito, setRedirect, createOrden, createCanvasOrden } from '../actions';
import Button from '../components/forms/Button';
import Icon from '../components/display/Icon';
import Footer from '../components/Footer';

// import config from '../../../config';
// import MainContent from '../components/MainContent';
// import Title from '../components/Title';
import Auth from './SignIn';
// import Tarjeta from '../components/Tarjetas';
// import Carrito from '../components/Carrito';
// import Carrito from '../components/Carrito';
// import { Link } from 'react-router-dom';
import '../assets/styles/containers/Compra.scss';

const App = ({ infoPago, misOrdenes, history, createCanvasOrden, createOrden, user, carrito, setStatusCarrito, statusNextCarrito, setRedirect })=> {
  const [first, setFirst] = useState(true);
  useEffect(()=>{
    if (first) {
      setFirst(false);
      document.querySelector('#react').scrollTo(0, 0);
    }
  }, []);

  const nextHandler = (num)=>{
    if (num || num === 0) {
      setStatusCarrito(num + 1);
    } else {
      statusNextCarrito();
    }
  };

  // console.log(misOrdenes);

  const startPay = ()=>{
    if (!misOrdenes.user) {
      console.log('[startPay]');
      let totalPago = 0;
      const carro = carrito.data.map((e)=>{
        totalPago += (e.precio * e.cantidad);
        return { serie: e.serie, cantidad: e.cantidad };
      });
      createOrden(carro, totalPago);
    }
  };

  const endHandler = (event)=>{
    history.push('ordenes');
  };

  const handleOnLoad = ()=>{
    setRedirect('');
  };

  let contentHeader;
  // console.log(carrito);
  switch (carrito.state) {
    case 0:
      if (!carrito.data[0]) {
        history.push('/catalogo');
      }
      contentHeader = (<>
        <h1>Pago con Transferencia.</h1>
        <p>Para realizar el pago deberá realizar una transferencia electrónica (Datos de la transacción se presentarán a continuación) y posteriormente mandarnos un comprobante de esta transacción. Sus cartones sólo serán liberados una vez que nos envíe este comprobante.</p>
        <Button onClick={statusNextCarrito}>Iniciar Pago</Button>
      </>);
      break;
    case 1:
      contentHeader = (<>
        <h1>Datos<br/>bancarios.</h1>
        { startPay() }
        <table className='bank__table'>
          <thead>
            {/* <tr>
              <th className='th__start'>Correo </th>
              <th className='th__end'>example@example.com</th>
            </tr> */}
          </thead>
          <tbody>
            <tr>
              <td className='td__start'>Numero de cuenta:</td>
              <td className='td__end'>{infoPago.numeroCuenta}</td>
            </tr>
            <tr>
              <td className='td__start'>Rut:</td>
              <td className='td__end'>{infoPago.rut}</td>
            </tr>
            <tr>
              <td className='td__start'>Titular:</td>
              <td className='td__end'>{infoPago.titular}</td>
            </tr>
            <tr>
              <td className='td__start'>Banco:</td>
              <td className='td__end'>{infoPago.banco}</td>
            </tr>
            {/* <tr>
              <td className='td__start'>Comentario en la transferencia (Poner en el espacio de comentario)</td>
              <td className='td__end'>Pago de cartones Bingoloteando, [Nombre] pago $[monto]</td>
            </tr> */}
          </tbody>
          <tfoot>
            <tr>
              <td className='td__start'>Monto a Pagar: </td>
              <td className='td__end'>$10000</td>
            </tr>
          </tfoot>
        </table>
        <Pageination content={['Datos bancarios.', 'Subir Comprobante.']} btn={true} pag={0} nextHandler={nextHandler} />
      </>);
      break;
    case 2:
      contentHeader = (<>
        <h1>Subir<br/>Comprobante.</h1>
        <div className='subirArchivo'>
          <a href={`https://docs.google.com/forms/d/e/1FAIpQLScjQezMOW9VhCldbPmnxNNqUqkDuEskgmOfm_1pzf3NVoyiLA/viewform?entry.1086376657=${misOrdenes.code}`} target='_blank' rel='noopener noreferrer'>
            <Icon type='upLoad' height='40' width='40' />
            Subir Archivo
          </a>
        </div>
        <p>
          Tu código es: {misOrdenes.code}
        </p>
        <Pageination content={['Datos bancarios.', 'Subir Comprobante.']} btn={true} pag={1} nextHandler={nextHandler} end={endHandler} />
      </>);
      break;
    default:
      contentHeader = (<>
        <h1>Error.</h1>
        <p> </p>
      </>);
      break;
  };

  return (
    <>
      {
        carrito.state >= 1 & !user.id ?
          <Auth history={history} notRedirect /> :
          <div className='compras' onLoad={handleOnLoad}>
            <Header title='Pagar' to='catalogo' >
              {contentHeader}
            </Header>
            <Footer/>
          </div>
      }
    </>
  );

};

const mapStateToProps = (state)=>{
  return {
    carrito: state.carrito,
    user: state.user,
    misOrdenes: state.ordenes.enProgreso,
    // state: state,
    infoPago: state.infoPago,
  };
};

const mapDispatchToProps = {
  createOrden,
  statusNextCarrito,
  setStatusCarrito,
  setRedirect,
  createCanvasOrden,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
