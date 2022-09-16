import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { desactiveCarrito } from '../';
// import { Link } from 'react-router-dom';
import IncrementStepper from './forms/IncrementStepper';
import Button from './forms/Button';
import { addItemToCarrito, removeItemToCarrito, desactiveCarrito, setRedirect, setStatusCarrito } from '../actions';
import numberWithCommas from '../utils';

import '../assets/styles/components/Carrito.scss';
const App = ({ setStatusCarrito, carrito, compras, addItemToCarrito, removeItemToCarrito, desactiveCarrito, history, user, setRedirect, varsBingo })=> {

  let totalCarrito = 0;
  let totalPrecio = 0;
  carrito.data.forEach((element) => {
    totalCarrito += (element.cantidad);
    totalPrecio += (element.precio * element.cantidad);
  });
  const [err, setErro] = useState('');
  useEffect(()=>{
    if (compras['user']) {
      setErro(<h1 className='errH1' >Ya tienes una orden en progreso, espera a que esta termine para iniciar otra.</h1>);
    }
  }, [compras]);
  const initPayHandler = ()=>{
    if (!user['email']) {
      history.push('/sign-in');
    } else {
      if (compras['user']) {
        history.push('/ordenes');
      } else {
        history.push('/compra');
        setStatusCarrito(0);
      }
    }
  };

  const addCarritoHandle = (id, cantidad)=>{
    addItemToCarrito({ serie: id.serie, title: id.title, precio: id.precio });
  };

  const subtractCarritoHandle = (id, cantidad)=>{
    removeItemToCarrito({ serie: id.serie, title: id.title, precio: id.precio });
    if (cantidad <= 0) {
      desactiveCarrito();
    }
  };

  return (
    <div className='carrito-2'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
          err
        }
      </div>
      <div className='carrito__body'>
        {
          !compras['user'] ?
            <table className='carrito__table'>
              <thead>
                <tr>
                  <th className='th__title'>Articulo</th>
                  <th className='th__button'>Cantidad</th>
                  <th className='th__precio'>Precio</th>
                </tr>
              </thead>
              <tbody>
                {carrito.data.map((e, index)=>{
                  return (
                    <tr key={index}>
                      <td className='td__title'>{e.title}</td>
                      <td className='td__button'>
                        {
                          !carrito.state >= 1 ?
                            <IncrementStepper text={false} setStartCount={e.cantidad} key={index} idHandler={{ serie: e.serie, title: e.title, precio: e.precio }} handlerAdd={addCarritoHandle} handlerSubtract={subtractCarritoHandle}/> :
                            <p>{e.cantidad}</p>
                        }
                      </td>
                      <td className='td__precio'>{varsBingo.pago.simbolo + numberWithCommas(e.precio)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className='td__title'>Total</td>
                  <td className='td__button'>{totalCarrito}</td>
                  <td className='td__precio'>{varsBingo.pago.simbolo + numberWithCommas(totalPrecio)}</td>
                </tr>
              </tfoot>
            </table> :
            <>
            </>
        }
      </div>
      <div className='carrito__footer'>
        {
          compras['user'] ?
            <Button onClick={initPayHandler} >Ver Compra</Button> :
            <Button onClick={initPayHandler} >Pagar { varsBingo.pago.simbolo + numberWithCommas(totalPrecio) + ' ' + varsBingo.pago.moneda}</Button>
        }
      </div>
    </div>
  );

};

const mapStateToProps = (state) => {
  return {
    carrito: state.carrito,
    user: state.user,
    compras: state.ordenes.enProgreso,
    varsBingo: state.vars,
  };
};

const mapDispatchToProps = {
  addItemToCarrito,
  removeItemToCarrito,
  desactiveCarrito,
  setRedirect,
  setStatusCarrito,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
