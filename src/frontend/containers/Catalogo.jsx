import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header-carrito';
import ButtonIcon from '../components/forms/ButtonIcon';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import Title from '../components/Title';
// import Section from '../components/Section';
import Tarjeta from '../components/Tarjetas';
import Carrito from '../components/Carrito';
// import Carrito from '../components/Carrito';
// import { Link } from 'react-router-dom';
import Spiner from '../components/spiner';

const App = ({ catalogos, load, carrito, history })=> {
  const [first, setFirst] = useState(true);
  useEffect(()=>{
    if (first) {
      setFirst(false);
      document.querySelector('#react').scrollTo(0, 0);
    }
  }, []);

  const clickHandler = ()=>{
    document.querySelector('#react').scrollTo(0, document.querySelector('header').offsetHeight);
  };

  return (
    <>
      <Header to='/' title='Compras' icon='trolley' >
        <h1>¡Apoya con tu compra para este bingo!</h1>
        <p>Comprando estos bingos estarás ayudando a cumplir nuestra meta. Solo añade a tu carrito los cartones de los bingos que quieras jugar y cuando estés list@ para pagar, presiona en el carrito que aparecerá en la parte superior derecha.</p>
        <p>Recuerda hacer tu compra antes del inicio del bingo. Una vez iniciado se cerrará la venta de cartones y no se recibirán más compras. No esperes más y Compra Ya!</p>
        <div style={{ transform: 'rotate(-90deg)' }}>
          <ButtonIcon onClick={clickHandler}/>
        </div>
      </Header>
      <MainContent>
        {
          !carrito.active ?
            <>
              <Title title='Catálogo'/>
              {
                load ?
                  <>{catalogos.filter((e)=>{
                    return e.enVenta === true;
                  }).map(
                    (item, index)=>
                      (
                        <Tarjeta
                          key={index}
                          title={item.titulo}
                          subTitle={item.subTitulo}
                          precio={item.precio}
                          serie={item.serie}
                          premios={item.premios.map((e, i)=>i === 0 ? `${e.nombre} ` : `~ ${e.nombre}`)}
                        />
                      ),
                  )
                  }</> :
                  <>
                    <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                      <Spiner />
                    </div>
                  </>
              }
            </> :
            <Carrito history={history}/>
        }
      </MainContent>
      {
        !carrito.active ?
          <Footer/> : <></>
      }
    </>
  );

};

const mapDispatchToProps = (state)=>{
  return {
    carrito: state.carrito,
    catalogos: state.catalogos,
    load: state.load,
  };
};

export default connect(mapDispatchToProps)(App);
