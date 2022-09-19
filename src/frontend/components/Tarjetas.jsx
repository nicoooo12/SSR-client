import React from 'react';
import { connect } from 'react-redux';
import Button from './forms/IncrementStepper';
import Badges from './display/Badges';
import numberWithCommas from '../utils';

import { addItemToCarrito, removeItemToCarrito } from '../actions';

import '../assets/styles/components/Tarjetas.scss';
const App = ({ title, subTitle, precio, serie, premios, mensaje, addItemToCarrito, removeItemToCarrito, carrito, varsBingo })=> {

  const addCarritoHandle = (serie, cantidad)=>{
    addItemToCarrito({ serie, title, precio: precio });
  };

  const subtractCarritoHandle = (serie, cantidad)=>{
    removeItemToCarrito({ serie, title, precio: precio });
  };

  return (
    <div className='tarjeta'>
      <div className='tarjeta__content'>
        <div className='tarjeta__title'>
          <h1 >{title}</h1>
          <Badges>{varsBingo.pago.simbolo + numberWithCommas(precio) + ' ' + varsBingo.pago.moneda}</Badges>
        </div>
        <div className='tarjeta__premios'>
          <small>
            { premios }
          </small>
        </div>
        <p className='tarjeta__subTitle'>{subTitle}</p>
        <div className='tarjeta__componentsGroup'>
          <span className='tarjeta-info'>{mensaje}</span>
          <Button idHandler={serie} setStartCount={carrito.data.filter((e)=>{return e.serie === serie;})[0] ? carrito.data.filter((e)=>{return e.serie === serie;})[0].cantidad : 0} handlerAdd={addCarritoHandle} handlerSubtract={subtractCarritoHandle} />
        </div>
      </div>
    </div>
  );

};

const mapStateToProps = (state)=>{

  return {
    carrito: state.carrito,
    varsBingo: state.vars,
  };

};
const mapDispatchToProps = {
  addItemToCarrito,
  removeItemToCarrito,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
