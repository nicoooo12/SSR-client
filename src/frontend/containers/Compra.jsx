import React from 'react';

import { connect } from 'react-redux';

import Layout from '../components/layouts/Layout';
// import { Link } from 'react-router-dom';
import Button from '../components/forms/Button';
// import Badges from '../components/display/Badges';
import Icon from '../components/display/Icon';
import Carrito from '../components/Carrito';
// import Accordion from '../components/forms/Accordion';
import Pagination from '../components/forms/Pagination';
import Input from '../components/forms/Input';
import Copy from '../components/forms/Input-copy';

import numberWithCommas from '../utils';
import { statusNextCarrito, setStatusCarrito, createOrden } from '../actions';
import '../assets/styles/containers/Compra.scss';

const Compra = ({ misOrdenes, history, varsBingo, createOrden, carrito, setStatusCarrito, statusNextCarrito }) => {
  const nextHandler = (num)=>{
    if (num || num === 0) {
      setStatusCarrito(carrito.state + num);
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
      setStatusCarrito(2);
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
        contentHeader = (
          <Layout to='/catalogo' title='Pago'>
            <div className='noTengo'>
              <h1>Pago con Transferencia.</h1>
              <p>
                Para realizar el pago deberá realizar una transferencia
                electrónica (Datos de la transacción se presentarán a
                continuación) y posteriormente, comprobaremos tu transferencia
                <br />
                Escribe tu Rut para comprobar la transferencia una vez esta se realice.
                <br />
                De no poder realizar la comprobación, se te notificará y tendrás
                que subir un comprobante de manera manual.
                <br />
                Sus cartones sólo serán liberados
                una vez que se compruebe la transferencia.
              </p>
              <br />
              <Input type='text' placeholder='R.U.T' name='rut'/>
              <br />
              <Button onClick={startPay}>Iniciar Pago</Button>
            </div>
          </Layout>
        );
      } else {
        nextHandler();
      }
      break;
    case 2:
      contentHeader = (<>
        <Layout to='/catalogo' title='Pago'>
          <div className='noTengo'>

            <h1>Datos<br/>bancarios.</h1>
            <table className='bank__table'>
              <thead>
                {/* <tr>
                  <th className='th__start'>Correo </th>
                  <th className='th__end'>example@example.com</th>
                </tr> */}
              </thead>
              <tbody>
                <tr>
                  <Copy placeholder='Numero de cuenta:'>
                    {varsBingo.pago.numCuenta}
                  </Copy>
                  <Copy placeholder='Rut:'>
                    {varsBingo.pago.rut}
                  </Copy>
                  <Copy placeholder='Titular:'>
                    {varsBingo.pago.titular}
                  </Copy>
                  <Copy placeholder='Banco:'>
                    {varsBingo.pago.banco}
                  </Copy>
                  <Copy placeholder='Correo:'>
                    {varsBingo.pago.correo}
                  </Copy>
                  <Copy placeholder='Motivo de la transferencia:'>
                    {varsBingo.pago.motivo}
                  </Copy>
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
            <Pagination content={['Datos bancarios.', 'Subir Comprobante.']} btn={true} pag={0} nextHandler={nextHandler} />
          </div>
        </Layout>
      </>);
      break;
    case 3:
      contentHeader = (<>
        <Layout to='/catalogo' title='Pago'>
          <div className='noTengo'>
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
                  <>Tu código de compra es: <span className='copy'>{misOrdenes.code}</span></> :
                  <>Cargando ...</>
              }
            </p>
            <Pagination content={['Datos bancarios.', 'Subir Comprobante.']} btn={true} pag={1} nextHandler={nextHandler} end={endHandler} />
          </div>
        </Layout>
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
