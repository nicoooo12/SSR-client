import React from 'react';
import Layout from '../components/layouts/Layout';
import { Link } from 'react-router-dom';

const NotFound = () => {

  return (
    <>
      <Layout title='Error' to='/' >
        <div className='noTengo'>
          <h1>Error 404: No encontrado</h1>
          <br />
          <p>No encontramos lo que estabas buscando :(</p>
          <p>La pagina a la que accediste no fue encontrada, si crees que se trata de un error comunícate con el <Link to='/contacto'>equipo técnico</Link></p>
          <br />
          <br />
          <Link to='/'>Volver al inicio</Link>
        </div>
      </Layout>
    </>
  );
};

export default NotFound;
