import React from 'react';
import { connect } from 'react-redux';

import Carton from '../components/Carton';
import Layout from '../components/layouts/Layout';
import { Link } from 'react-router-dom';
import Button from '../components/forms/Button';

import '../assets/styles/components/Carton.scss';
const Cartones = ({ cartones, catalogo }) => {

  return (
    <>
      <Layout title='Cartones' to='/' >
        {
          cartones[0] ?
            cartones.map((e, index)=>{
              return (
                <Carton
                  key={index}
                  color={catalogo.filter((o)=>{return o.serie === e.serie;})[0].color}
                  title={catalogo.filter((o)=>{return o.serie === e.serie;})[0].titulo}
                  data={e.data}
                  serie={e.serie}
                  code={e.code}
                />
              );
            }) :
            <>
              <div className='noTengo'>
                <h1>No tienes Cartones</h1>
                <p>Que espera! ve y compra tus cartones para el bingo.</p>
                <Link to='/catalogo'>
                  <Button>
                    Ir a comprar
                  </Button>
                </Link>
              </div>
            </>
        }
      </Layout>
    </>
  );
};

const mapDispatchToProps = (state)=>{
  return {
    cartones: state.cartonesUser,
    catalogo: state.catalogos,
  };
};

export default connect(mapDispatchToProps)(Cartones);
