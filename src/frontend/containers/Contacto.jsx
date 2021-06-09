import React from 'react';
import Header from '../components/Header-B';
import Footer from '../components/Footer';
import varsBingo from '../varsBingo';

const App = ()=> {

  return (
    <>
      <Header/>
      <div>
        <h1>Contacto</h1>
        <table className='bank__table'>
          <thead>
            <tr>
              <th className='th__start'> </th>
              <th className='th__end'>Contacto</th>
            </tr>
          </thead>
          <tbody>
            {
              varsBingo.contacto.map((e, index)=>{
                return (
                  <tr key={index}>
                    <td className='td__start'>{e[0]}</td>
                    <td className='td__end'>{e[1]}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );

};

export default App;
