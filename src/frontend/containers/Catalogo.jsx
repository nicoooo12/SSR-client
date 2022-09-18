import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/layouts/Layout';
import Tarjeta from '../components/Tarjetas';
import Icon from '../components/display/Icon';

import { Link } from 'react-router-dom';

import numberWithCommas from '../utils';

import '../assets/styles/containers/Catalogo.scss';

const Catalogo = ({ catalogos, carrito, varsBingo, history }) => {

  let totalCarrito = 0;
  let totalPrecio = 0;
  carrito.data.forEach((element) => {
    totalCarrito += (element.cantidad);
    totalPrecio += (element.precio * element.cantidad);
  });

  return (
    <>
      <Layout title='Catalogo' to='/' >
        {
          <>
            {catalogos.filter((e)=>{
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
            }
          </>
        }
        {
          totalCarrito > 0 ?
            <div className={'carrito'} >
              <div className='gradiente'/>
              <div className='carrito-main'>
                <div className={'carro'} >
                  <div className='icon' >
                    <Icon type={'trolley'} width='35' height='35'/>
                    <div className='bubble'>{totalCarrito}</div>
                  </div>
                </div>
                <div className='payText' >{varsBingo.pago.simbolo + numberWithCommas(totalPrecio) + ' ' + varsBingo.pago.moneda}</div>
                <Link to='/test'>
                  <div className='pagar'>
                    <span>Pagar</span>
                    <div>
                      <Icon type='arrow' stroke='#4700AB' />
                    </div>
                  </div>
                </Link>
              </div>
            </div> :
            <div >
              <div />
              <div />
            </div>
        }
      </Layout>
    </>
  );
};

const mapDispatchToProps = (state)=>{
  return {
    carrito: state.carrito,
    catalogos: state.catalogos,
    varsBingo: state.vars,
  };
};

export default connect(mapDispatchToProps)(Catalogo);
