import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/layouts/Layout';
import Tarjeta from '../components/Tarjetas';
import Icon from '../components/display/Icon';

import { Link } from 'react-router-dom';

import numberWithCommas from '../utils';
import { setStatusCarrito } from '../actions';

import '../assets/styles/containers/Catalogo.scss';
// import _1 from '../assets/images/auspicio.png';

const Catalogo = ({ setStatusCarrito, catalogos, carrito, varsBingo, history }) => {

  let totalCarrito = 0;
  let totalPrecio = 0;
  carrito.data.forEach((element) => {
    totalCarrito += (element.cantidad);
    totalPrecio += (element.precio * element.cantidad);
  });

  const typePremio = ['Carton Completo', 'Letra', 'Linea'];

  return (
    <>
      <Layout title='Catalogo' to='/' >
        {/* <img src={_1} alt='' className='img' /> */}
        {
          <>
            {catalogos.sort(function (a, b) {
              if (a.serie > b.serie) {
                return 1;
              }
              if (a.serie < b.serie) {
                return -1;
              }
              // a must be equal to b
              return 0;
            }).filter((e)=>{
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
                    mensaje={item?.mensaje}
                    premios={item.premios.filter((e)=>e.nombre !== ' ').map((e, i)=>{
                      if (item.serie === 0) {
                        if (e.nombre) {
                          return i === 0 ? `${e.nombre} ` : `~ ${e.nombre}`;
                        }
                        return '';
                      }
                      if (e.nombre === '-' || e.nombre === ' ' || e.nombre === '' || e.nombre === undefined || e.nombre === null) {
                        return '';
                      }
                      if (i === 0) {
                        return <span key={i}><b>{typePremio[i]}:</b> {e.nombre}</span>;
                      }
                      return <span key={i}><br/><b>{typePremio[i]}:</b> {e.nombre}</span>;

                    })}
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
                <div className='payText' >{varsBingo.simbolo + numberWithCommas(totalPrecio * varsBingo.cambio) + ' ' + varsBingo.moneda}</div>
                <Link to='/compra' onClick={()=>{setStatusCarrito(0);}}>
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

const mapStateToProps = (state)=>{
  return {
    carrito: state.carrito,
    catalogos: state.catalogos,
    varsBingo: state.vars,
  };
};

const mapDispatchToProps = {
  setStatusCarrito,
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);
