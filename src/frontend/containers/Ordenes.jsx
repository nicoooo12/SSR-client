import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/layouts/Layout';
import Button from '../components/forms/Button';
import { setStatusCarrito, cancelarMiOrden } from '../actions';
import { Link } from 'react-router-dom';

import numberWithCommas from '../utils';

import '../assets/styles/containers/Ordenes.scss';

const Ordenes = ({ setStatusCarrito, cancelarMiOrden, history, enProgreso, terminadas, catalogo, varsBingo }) => {

  const addImgHandler = () => {
    setStatusCarrito(2);
    history.push('/compra');
  };

  const viewBankData = () => {
    setStatusCarrito(1);
    history.push('/compra');
  };

  const cancelHandler = () => {
    confirm('¿Estás seguro de que quieres cancelar tu orden?') ? cancelarMiOrden() : false;
  };

  return (
    <>
      <Layout title='Compras' to='/' >
        {
          !enProgreso['user'] ?
            terminadas[0] ? <></> :
              <>
                <div className='noTengo'>
                  <h1>No tienes compras</h1>
                  <p>Que espera! ve y compra tus cartones para el bingo.</p>
                  <Link to='/catalogo'>
                    <Button>
                      Ir a comprar
                    </Button>
                  </Link>
                </div>
              </> :
            <>
              <div className='cardPedidos'>
                <h1>Compra<br/> en progreso</h1>
                <table className='bank__table'>
                  <thead>
                    <tr>
                      <th className='th__start'>Articulo</th>
                      <th className='th__end'>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      enProgreso.compra.map((e, index)=>{
                        return (
                          <tr key={index}>
                            <td className='td__start'>{catalogo.filter((r)=>{return r.serie === e.serie;})[0].titulo}</td>
                            <td className='td__end'>x{e.cantidad}</td>
                          </tr>
                        );
                      })
                    }
                    <tr>
                      <td> </td>
                      <td> </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className='td__start'>Código de orden:</td>
                      <td className='td__end'>{enProgreso.code}</td>
                    </tr>
                    <tr>
                      <td className='td__start'>Pago total:</td>
                      <td className='td__end'>{varsBingo.pago.simbolo}{numberWithCommas(enProgreso.totalPago)} {varsBingo.pago.moneda}</td>
                    </tr>
                    <tr>
                      <td className='td__start'>Comprobante:</td>
                      <td className='td__end'>{enProgreso.canvasUrl ? 'Listo' : <><Button size='small' onClick={addImgHandler}>Agregar</Button></>}</td>
                    </tr>
                    <tr>
                      <td className='td__start'>Fecha:</td>
                      <td className='td__end'>{new Date(enProgreso.fecha).getDate()}-{new Date(enProgreso.fecha).getMonth() + 1}-{new Date(enProgreso.fecha).getFullYear()}, { ('00' + new Date(enProgreso.fecha).getHours()).slice(-2) }:{ ('00' + new Date(enProgreso.fecha).getMinutes()).slice(-2) }</td>
                    </tr>
                    <tr>
                      <td className='td__start'>Estado:</td>
                      <td className='td__end'>{enProgreso.estado === 2 ? 'Iniciada' : 'En revisión' }</td>
                    </tr>
                  </tfoot>
                  {
                    enProgreso.message ?
                      <div className='comentario'>
                        <h2>Comentario:</h2>
                        <p>{enProgreso.message}</p>
                      </div> : <></>
                  }
                  {
                    !enProgreso.canvasUrl ?
                      <>
                        <Button style={{ width: '80%', top: '25px', position: 'relative' }} size='large' typebutton='secondary' onClick={viewBankData}>Ver datos bancarios</Button>
                        <Button style={{ marginBottom: '20px', width: '20%', top: '25px', position: 'relative' }} autoLogin={false} size='small' typebutton='text' onClick={cancelHandler}>Cancelar orden</Button>
                      </> : <></>
                  }
                </table>
              </div>
            </>
        }
        {
          terminadas[0] ?
            <div className='contentCardsPedidos'>
              {
                terminadas.map((e, index)=>{
                  const fecha = new Date(e.fecha);
                  return (
                    <div key={index} className='cardPedidosEnd'>
                      <h1>Pedido {index + 1}</h1>
                      <table className='bank__table'>
                        <thead>
                          <tr>
                            <th className='th__start'>Articulo</th>
                            <th className='th__end'>Cantidad</th>
                            <th className='th__end'>Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            e.compra.map((e, index)=>{
                              return (
                                <tr key={index}>
                                  <td className='td__start'>{catalogo.filter((r)=>{return r.serie === e.serie;})[0].titulo}</td>
                                  <td className='td__end'>x{e.cantidad}</td>
                                  <td className='td__end'>{varsBingo.pago.simbolo}{catalogo.filter((r)=>{return r.serie === e.serie;})[0].precio * e.cantidad} {varsBingo.pago.moneda}</td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                        <tfoot>
                          <tr>
                            <td className='td__start'>Total a pagar:</td>
                            <td className='td__end'>{varsBingo.pago.simbolo}{e.pago} {varsBingo.pago.moneda}</td>
                          </tr>
                          <tr>
                            <td className='td__start'>Total pagado:</td>
                            <td className='td__end'>{varsBingo.pago.simbolo}{e.pagado} {varsBingo.pago.moneda}</td>
                          </tr>
                          <tr>
                            <td className='td__start'>Fecha:</td>
                            <td className='td__end'>{fecha.getDate()}-{fecha.getMonth() + 1}-{fecha.getFullYear()}, { ('00' + fecha.getHours()).slice(-2) }:{ ('00' + fecha.getMinutes()).slice(-2) }</td>
                          </tr>
                          <tr>
                            <td className='td__start'>Estado:</td>
                            <td className='td__end'>Finalizada</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>);
                })
              }
            </div> :
            <></>
        }
      </Layout>
    </>
  );
};

const mapSateToProps = (state)=>{
  return {
    enProgreso: state.ordenes.enProgreso,
    terminadas: state.ordenes.terminadas,
    catalogo: state.catalogos,
    varsBingo: state.vars,
  };
};

const mapDispatchToProps = {
  setStatusCarrito,
  cancelarMiOrden,
};

export default connect(mapSateToProps, mapDispatchToProps)(Ordenes);
