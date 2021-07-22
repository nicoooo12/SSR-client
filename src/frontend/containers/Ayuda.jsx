import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Titulo from '../components/Title';
import ButtonIcon from '../components/forms/ButtonIcon';
import Accordion from '../components/forms/Accordion';

import '../assets/styles/containers/Ayuda.scss';
import { Link } from 'react-router-dom';

const App = ({ history })=> {
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
      <Header title='Ayuda!' to='/' >
        <h1>Estamos aquí para ayudarte.</h1>
        <p>Tienes dudas con algo? No te preocupes, presiona sobre la pregunta que más se acomode a tus dudas. Si necesitas asistencia de otro tipo ve a la sección de <Link to='/contacto'>contactos</Link> y contacta con el equipo organizador</p>
        <div style={{ transform: 'rotate(-90deg)' }}>
          <ButtonIcon onClick={clickHandler} />
        </div>
      </Header>
      <div className='mainContent' style={{ top: '640px', position: 'absolute' }}>
        <Titulo title='Preguntas frecuentes' />
        <Accordion title='¿Qué es el Bingoloteando?' >
          El Bingoloteando es una app para jugar bingo, diseñada para apoyar a causas que lo necesiten facilitando la venta y jugabilidad de cartones de bingo.
        </Accordion>
        <Accordion title='¿Cómo entro a la página?' >
          <ul className='list-group'>
            Para poder acceder  a la página de Bingoloteando necesitas primero crearte una cuenta.
            <li className='list-group-item'>
              Para esto solo tienes que apretar “Registrarme” en el home, que te llevará a la página de registro.
            </li>
            <li className='list-group-item'>
              En esta página tendrás que poner tu Nombre y Apellido, Correo Electrónico y crear una Contraseña para tu cuenta.
            </li>
            <li className='list-group-item'>
              Cuando ya hayas ingresado todo eso, solo tienes que apretar el botón de “Registrarme” y podrás acceder a la página.
            </li>
            <li className='list-group-item'>
              Ya registrad@, para acceder de nuevo a la página solo debes poner el correo electrónico y contraseña que usaste para registrarte y apretar el botón de “Ingresar”.
            </li>
          </ul>
        </Accordion>
        <Accordion title='No se como hacer una cuenta' >
          <ul className='list-group'>
            <li className='list-group-item'>
              Para crearte una cuenta, primero debes apretar en “Registrarme”  a la derecha del botón de “Ingresar” en la página inicial.
            </li>
            <li className='list-group-item'>
              Ya en la página de registro, necesitas poner en cada casilla la información necesaria. En orden son: Nombre y Apellido, Correo Electrónico, y crear una Contraseña que te parezca (puede ser lo que tu quieras, con un mínimo de 8 caracteres.
            </li>
            <li className='list-group-item'>
              Cuando termines de ingresar todos esos datos, solo tienes que apretar el botón de “Registrarme” ¡Y listo! No es necesario hacer ningún paso extra.
            </li>
            <li className='list-group-item'>
              ¿Por qué necesitas poner estos datos?
              <ul className='list-group'>
                <li className='list-group-item'>
                  Tu nombre y apellido se volverán el nombre de la cuenta y como se te identificará al momento de jugar.
                </li>
                <li className='list-group-item'>
                  Tu correo electrónico va a ser necesario para ingresar de nuevo a la página después de haberla cerrado.
                </li>
                <li className='list-group-item'>
                  La contraseña se necesitará al momento de ingresar de nuevo a la página después de haberla cerrado.
                </li>
              </ul>
            </li>
              ¡Recuerda! Si ya te hiciste una cuenta una vez, no es necesario volver a hacer otra. Solo tienes que iniciar sesión con tu correo electrónico y la contraseña que creaste y apretar el botón de “Entrar”. Puedes encontrar la página apretando “Iniciar sesión” en la página de inicio.
          </ul>
        </Accordion>
        <Accordion title='No me funciona mi cuenta' >
          <ul className='list-group'>
            <li className='list-group-item'>
              Si no puedes acceder a tu cuenta,  asegura antes que nada que:
              <ul className='list-group'>
                <li className='list-group-item'>
                  Te hayas creado una cuenta en la página
                </li>
                <li className='list-group-item'>
                  Has puesto la contraseña y/o el correo electrónico con el cual te registraste correctamente.
                </li>
              </ul>
            </li>
            <li className='list-group-item'>
                Si no es ninguna de estas opciones, contáctate con nosotros con la información proporcionada en la página de <Link to='/contacto' >“Contacto”</Link>.
            </li>
          </ul>
        </Accordion>
        <Accordion title='¿Cómo se compra un cartón?' >
          <ul className='list-group'>
            <li className='list-group-item'>
              Accede a la página registrándote o iniciando sesión.
            </li>
            <li className='list-group-item'>
                Ya en la página principal, aprieta el botón de “Comprar cartones”.
Esto te llevará a la página de compras.

            </li>
            <li className='list-group-item'>
              En la página de compras estarán las opciones de cartones para cada bingo con los premios correspondientes.

            </li>
            <li className='list-group-item'>
              Para comprar un cartón, aprieta el botón “Añadir al carrito”. Si deseas comprar más de un cartón aprieta el símbolo “+” hasta llegar al número deseado. Si quieres sacar un cartón del carrito, aprieta el símbolo “-”.

            </li>
            <li className='list-group-item'>
              En la parte superior de la pantalla aparecerá el “Carrito de compras” con la cantidad de cartones que has comprado.

            </li>
            <li className='list-group-item'>
              Cuando hayas añadido todos los cartones que quieras jugar, presiona “Pagar”.

            </li>
            <li className='list-group-item'>
              Cuando hayas terminado de pagar podrás ver tus cartones apretando “Ver mis cartones” en el menú de la pagina de inicio.
            </li>
          </ul>
        </Accordion>
        <Accordion title='¿Cómo puedo jugar?' >
          <ul className='list-group'>
            <li className='list-group-item'>
              Cuando sea la hora de jugar, uno tiene que estar en la página.
            </li>
            <li className='list-group-item'>
              Ya en la página, tiene que apretar “Jugar” en el menú en la parte superior de la página de inicio, que te llevará a la página de “¡A Jugar!”

            </li>
            <li className='list-group-item'>
              Si compró más de un cartón para un bingo podrá jugar con los dos cartones. Para cambiar de un cartón a otro debe deslizar la pantalla, en la parte superior aparece una flecha, que cambia la dirección de la aplicación de los cartones.

            </li>
            <li className='list-group-item'>
              Para jugar tus cartones, solo debes presionar en los números de la forma en que desees. Y cuando creas que tienes todos los números, aprieta el botón que dice “BINGO!!”, en ese momento te aparecerá un mensaje que dice: “BINGO!! Estamos revisando tu cartón. Espera un momento.”

            </li>
            <li className='list-group-item'>
              Nadie podrá ver los números que vas apretando. Sin embargo, si aprietas el botón de “BINGO!!”, se transmitirá en la pantalla que tú estás diciendo “BINGO!!”.

            </li>
            <li className='list-group-item'>
              Cuando la partida se termine, volverás automáticamente a la página de “En espera” a esperar por la próxima partida.

            </li>
          </ul>
        </Accordion>
      </div>
    </>
  );
};

export default App;
