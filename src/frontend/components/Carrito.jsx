import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { desactiveCarrito } from '../';
// import { Link } from 'react-router-dom';
import IncrementStepper from './forms/IncrementStepper';
import Button from './forms/Button';
import { addItemToCarrito, removeItemToCarrito, desactiveCarrito, setRedirect, setStatusCarrito, addReferidoToCarrito } from '../actions';
import numberWithCommas from '../utils';
import DropDown from '../components/forms/DropDown';

import '../assets/styles/components/Carrito.scss';

const App = ({ setStatusCarrito, carrito, compras, addItemToCarrito, removeItemToCarrito, desactiveCarrito, history, varsBingo })=> {
  const referido = React.createRef(referido);

  let totalCarrito = 0;
  let totalPrecio = 0;
  carrito.data.forEach((element) => {
    totalCarrito += (element.cantidad);
    totalPrecio += (element.precio * element.cantidad);
  });
  const [continuar, setContinuar] = useState(false);
  const [err, setErro] = useState('');
  useEffect(()=>{
    if (compras['user']) {
      setErro(<h1 className='errH1' >Ya tienes una orden en progreso, espera a que esta termine para iniciar otra.</h1>);
    }
  }, [compras]);
  const initPayHandler = ()=>{
    if (referido.current.children[0].value !== '') {
      addReferidoToCarrito(referido.current.children[0].value);
      setStatusCarrito(1);
    } else {
      referido.current.className = 'input-error';
    }
  };

  const addCarritoHandle = (id, cantidad)=>{
    addItemToCarrito({ serie: id.serie, title: id.title, precio: id.precio });
  };

  const verCompraHandler = () => {
    if (compras.canvasUrl) {
      history.push('/ordenes');
    } else {
      setStatusCarrito(1);
    }
  };

  const subtractCarritoHandle = (id, cantidad)=>{
    removeItemToCarrito({ serie: id.serie, title: id.title, precio: id.precio });
    if (cantidad <= 0) {
      desactiveCarrito();
    }
  };

  const changeHandler = () => {
    console.log(referido.current.children[0].value);
    referido.current.className = 'input';
    if (referido.current.children[0].value) {
      setContinuar(true);
    } else {
      setContinuar(false);
    }
  };

  const referidos = ['No referido', 'Fernanda Acevedo', 'Maximiliano Agüero', 'Kiara Álvarez', 'María José Amo', 'Sofía Campos', 'Matías Cubillos ', 'Martina Devia', 'Angela Díaz', 'Javiera Díaz', 'Benjamín Duque', 'Nerina Farías', 'Beatriz González', 'Lucca Haase', 'Sophia Husmann', 'Kathrin Kittel', 'Maite Larrondo', 'Luciano Montoya', 'Julián Oñate', 'Camila Oyaneder', 'Florencia Pérez', 'Olivia Rodríguez', 'Pablo Saavedra', 'Vicente Sánchez', 'Trinidad Santibáñez', 'Luciana Silva', 'Vjera Suazo', 'María Isidora Vásquez', 'Valentina Zurita', 'María Paz Asenjo', 'Iker Bolados', 'Amelia Bórquez', 'Pedro Cortes', 'Sofia Carolina Daza', 'Amanda Díaz', 'Helena Díaz', 'Magdalena Escobar', 'Gustavo Espinoza', 'Paula González', 'Amalia Jeison', 'Francisca Mardones', 'Matilda Marín', 'Emilia Martínez', 'Sofía Massú', 'Agustín Melis', 'Marcelo Morales', 'Ignacio Oportus', 'Emilia Orellana', 'Rosario Palacios', 'Ignacio Peña', 'Rosario Quezada', 'José Tomás Rath', 'Nicolás Sejas', 'Josefa Semler', 'Antonia Paz Tapia', 'Martina Ternicien', 'Jesús Daniel Uzcanga'];

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
            <>
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
              </table>
              <br />
              <hr />
              <div>
                <DropDown onChange={changeHandler} Ref={referido} text={'Este campo es obligatorio'} placeholder='Referido'>
                  {
                    referidos.map((r, index) => {
                      return <><option value={r} key={index} /></>;
                    })
                  }
                </DropDown>
              </div>
              <hr />
            </> :
            <>
            </>
        }
      </div>
      <div className='carrito__footer'>
        {
          compras['user'] ?
            <Button onClick={verCompraHandler} >Ver Compra</Button> :
            <Button autoLogin={false} disabled={!continuar} onClick={initPayHandler} >Pagar { varsBingo.pago.simbolo + numberWithCommas(totalPrecio) + ' ' + varsBingo.pago.moneda}</Button>
        }
        {
          console.log(continuar)
        }
      </div>
    </div>
  );

};

const mapStateToProps = (state) => {
  return {
    carrito: state.carrito,
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
  addReferidoToCarrito,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
