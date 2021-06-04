import React from 'react';
import Header from '../components/Header-B';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const App = ()=> {

  return (
    <>
      <Header/>
      <div>
        <h1>Error 404: No encontrado</h1>
        <br />
        <p>No encontramos lo que estabas buscando :(</p>
        <p>La pagina a la que accediste no fue encontrada, si crees que se trata de un error comunicate con el <Link to='/contacto'>equipo técnico</Link></p>
        <br />
        <br />
        <Link to='/'>Volver al inicio</Link>
      </div>
      <Footer/>
    </>
  );

};

export default App;
