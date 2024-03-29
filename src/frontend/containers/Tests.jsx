import React from 'react';

import { connect } from 'react-redux';

import Layout from '../components/layouts/Layout';
import { Link } from 'react-router-dom';
import Button from '../components/forms/Button';
import Badges from '../components/display/Badges';
import Icon from '../components/display/Icon';
import Carrito from '../components/Carrito';
import Accordion from '../components/forms/Accordion';

import { statusNextCarrito, setStatusCarrito, createOrden } from '../actions';
import '../assets/styles/containers/Play.scss';

const Compra = ({ misOrdenes, history, varsBingo, createOrden, carrito, setStatusCarrito, statusNextCarrito }) => {
  const nextHandler = (num)=>{
    if (num || num === 0) {
      setStatusCarrito(num + 1);
    } else {
      statusNextCarrito();
    }
  };
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

  let contentHeader;
  switch (carrito.state) {
    case 0:
      contentHeader = (
        <>
          <Layout to='/catalogo' title='Pago'>
            <Carrito />
          </Layout>
        </>
      );
      break;
    case 1:
      // if (!carrito.data[0]) {
      //   history.push('/catalogo');
      // }
      if (!misOrdenes['user']) {
        contentHeader = (<div className='noTengo'>
          <h1>Pago con Transferencia.</h1>
          <p>Para realizar el pago deberá realizar una transferencia electrónica (Datos de la transacción se presentarán a continuación) y posteriormente mandarnos un comprobante de esta transacción. Sus cartones sólo serán liberados una vez que nos envíe este comprobante.</p>
          <Button onClick={statusNextCarrito}>Iniciar Pago</Button>
        </div>);
      } else {
        nextHandler();
      }
      break;
    case 2:
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
              <td className='td__end'>{varsBingo.pago.numCuenta}</td>
            </tr>
            <tr>
              <td className='td__start'>Rut:</td>
              <td className='td__end'>{varsBingo.pago.rut}</td>
            </tr>
            <tr>
              <td className='td__start'>Titular:</td>
              <td className='td__end'>{varsBingo.pago.titular}</td>
            </tr>
            <tr>
              <td className='td__start'>Banco:</td>
              <td className='td__end'>{varsBingo.pago.banco}</td>
            </tr>
            <tr>
              <td className='td__start'>Correo:</td>
              <td className='td__end correoTable' style={{ width: '100%', wordBreak: 'break-word' }}>{varsBingo.pago.correo}</td>
            </tr>
            <tr>
              <td className='td__start'>Motivo de la transferencia:</td>
              <td className='td__end'>{varsBingo.pago.motivo}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className='td__start'>Monto a Pagar: </td>
              <td className='td__end'>
                {varsBingo.pago.simbolo}{
                  misOrdenes['totalPago'] ?
                    <>{numberWithCommas(misOrdenes.totalPago)}</> :
                    <>Cargando ...</>
                } {varsBingo.pago.moneda}
              </td>
            </tr>
          </tfoot>
        </table>
        <Pageination content={['Datos bancarios.', 'Subir Comprobante.']} btn={true} pag={0} nextHandler={nextHandler} />
      </>);
      break;
    case 3:
      contentHeader = (<>
        <h1>Subir<br/>Comprobante.</h1>
        <div className='subirArchivo'>
          {
            misOrdenes['code'] ?
              <a href={`https://docs.google.com/forms/d/e/1FAIpQLScjQezMOW9VhCldbPmnxNNqUqkDuEskgmOfm_1pzf3NVoyiLA/viewform?entry.1086376657=${misOrdenes.code}`} target='_blank' rel='noopener noreferrer'>
                <Icon type='upLoad' height='40' width='40' />
                Subir Archivo
              </a> : <>Espera un momento<br/>Estamos procesado tu compra.</>
          }
        </div>
        <p>
          {
            misOrdenes['code'] ?
              <>Tu código de compra es: {misOrdenes.code}</> :
              <>Cargando ...</>
          }
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
      {contentHeader}
    </>
  );
};

const mapStateToProps = (state)=>{
  return {
    carrito: state.carrito,
    misOrdenes: state.ordenes.enProgreso,
    varsBingo: state.vars,
  };
};

const mapDispatchToProps = {
  createOrden,
  statusNextCarrito,
  setStatusCarrito,
};

export default connect(mapStateToProps, mapDispatchToProps)(Compra);
