import React from 'react';
import Header from '../components/Header-B';
import Footer from '../components/Footer';

const App = ()=> {

  return (
    <>
      <Header/>
      <div>
        <h1>Contacto</h1>
        <table className='contacto'>
          <thead>
            <tr>
              <th className='th__start'> </th>
              <th className='th__end'>Contacto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='td__start'>Equipo técnico:</td>
              <td className='td__end'>nicoflores.dev@gmail.com</td>
            </tr>
            <tr>
              <td className='td__start'>Equipo organizador:</td>
              <td className='td__end'>ayudabingoisabel@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );

};

export default App;
