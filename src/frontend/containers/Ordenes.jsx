import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import HeaderB from '../components/Header-B';
import Header from '../components/Header';
// import Carton from '../components/Carton';
import Titulo from '../components/Title';
import Button from '../components/forms/Button';
import { Link } from 'react-router-dom';
import { setStatusCarrito, cancelarMiOrden } from '../actions';

import '../assets/styles/containers/Ordenes.scss';

const App = ({ setStatusCarrito, cancelarMiOrden, user, history, enProgreso, terminadas, catalogo })=> {
  const [first, setFirst] = useState(true);
  useEffect(()=>{
    if (first) {
      setFirst(false);
      document.querySelector('#react').scrollTo(0, 0);
    }
  }, []);
  if (!user.id) {
    history.push('/');
  }

  const headerAA = useRef('');

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
      {
        !enProgreso['user'] ?
          terminadas[0] ?
            <HeaderB/> :
            <Header title='Mis ordenes' to='/' refe={headerAA}>
              <h1>No tienes<br/>ordenes</h1>
              <p>Que espera! ve y compra tus cartones para el bingo.</p>
              <Link to='/catalogo'>
                <Button>
                  Ir a comprar
                </Button>
              </Link>
            </Header> :
          <Header title='Mis ordenes' to='/' refe={headerAA}>
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
                          <td className='td__end'>{e.cantidad}</td>
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
                    <td className='td__end'>${enProgreso.totalPago}</td>
                  </tr>
                  <tr>
                    <td className='td__start'>Comprobante:</td>
                    <td className='td__end'>{enProgreso.canvasUrl ? 'Listo' : <><Button size='small' onClick={addImgHandler}>Agregar</Button></>}</td>
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
          </Header>
      }
      {
        terminadas[0] ?
          <div className='contentCardsPedidos' style={enProgreso.user ? { top: headerAA.current.clientHeight ? `${headerAA.current.clientHeight + 40}px` : '800px', position: 'absolute' } : {}}>
            <Titulo title='Mis compras' />
            {
              terminadas.map((e, index)=>{
                return (
                  <div key={index} className='cardPedidosEnd'>
                    <h1>Compra<br/> finalizada</h1>
                    <table className='bank__table'>
                      <thead>
                        <tr>
                          <th className='th__start'>Articulo</th>
                          <th className='th__end'>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          e.compra.map((e, index)=>{
                            return (
                              <tr key={index}>
                                <td className='td__start'>{catalogo.filter((r)=>{return r.serie === e.serie;})[0].titulo}</td>
                                <td className='td__end'>{e.cantidad}</td>
                              </tr>
                            );
                          })
                        }
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className='td__start'>Total a pagar:</td>
                          <td className='td__end'>${e.pago}</td>
                        </tr>
                        <tr>
                          <td className='td__start'>Total pagado:</td>
                          <td className='td__end'>${e.pagado}</td>
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
    </>
  );
};

const mapSateToProps = (state)=>{
  return {
    user: state.user,
    enProgreso: state.ordenes.enProgreso,
    terminadas: state.ordenes.terminadas,
    catalogo: state.catalogos,
  };
};

const mapDispatchToProps = {
  setStatusCarrito,
  cancelarMiOrden,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
