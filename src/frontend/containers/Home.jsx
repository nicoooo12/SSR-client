import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Footer from '../components/Footer';
import ButtonIcon from '../components/forms/ButtonIcon';
import Button from '../components/forms/Button';
import { updateState, logoutRequest } from '../actions';
import { Link } from 'react-router-dom';
import Icon from '../components/display/Icon';
import Card from '../components/display/Card';
import Spiner from '../components/spiner';
import varsHome from '../varsBingo';

import Img1 from '../assets/images/B.png';

import '../assets/styles/components/Header.scss';
import '../assets/styles/containers/menu.scss';
import '../assets/styles/containers/Home.scss';

const App = ({ load, varsBingo, pedidos, play, user, entrada, updateState, logoutRequest })=> {
  const [first, setFirst] = useState(true);
  console.log(entrada);
  useEffect(()=>{
    if (first) {
      setFirst(false);
      document.querySelector('#react').scrollTo(0, 0);
    }
  }, []);
  const [menu, setMenu] = useState(false);
  const menuHandler = ()=>{
    if (menu) {
      setMenu(false);
      setFocusHeader(true);
    } else {
      setMenu(true);
      setFocusHeader(true);
    }
  };

  // ----
  useEffect(()=>{

    //===
    // VARIABLES
    //===
    const DATE_TARGET = new Date('10/1/2022 3:00 PM');
    // DOM for render
    const SPAN_DAYS = document.querySelector('span#days');
    const SPAN_HOURS = document.querySelector('span#hours');
    const SPAN_MINUTES = document.querySelector('span#minutes');
    const SPAN_SECONDS = document.querySelector('span#seconds');
    // Milliseconds for the calculations
    const MILLISECONDS_OF_A_SECOND = 1000;
    const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
    const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
    const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24;

    //===
    // FUNCTIONS
    //===

    /**
 * Method that updates the countdown and the sample
 */
    function updateCountdown() {
    // Calcs
      const NOW = new Date();
      const DURATION = DATE_TARGET - NOW;
      const REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
      const REMAINING_HOURS = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
      const REMAINING_MINUTES = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
      const REMAINING_SECONDS = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);
      // Thanks Pablo Monteserín (https://pablomonteserin.com/cuenta-regresiva/)

      // Render
      if (!menu) {
        SPAN_DAYS.textContent = REMAINING_DAYS;
        SPAN_HOURS.textContent = REMAINING_HOURS;
        SPAN_MINUTES.textContent = REMAINING_MINUTES;
        SPAN_SECONDS.textContent = REMAINING_SECONDS;
      }
    }

    //===
    // INIT
    //===
    updateCountdown();
    // Refresh every second
    setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);
  });

  // ----

  const clickHandler = ()=>{
    document.querySelector('#react').scrollTo(0, document.querySelector('header').offsetHeight);
  };

  const logoutHandler = ()=>{
    logoutRequest();
    setMenu(false);
    setFocusHeader(true);
  };

  return (
    <>
      {
        menu ?
          <div className='menu'>
            <div>
              <h1>Bingoloteando</h1>
              <div onClick={menuHandler}>
                <Icon width='30' height='30' />
              </div>
            </div>
            <ul>
              {
                user.id ?
                  <>
                    {
                      user.admin ? (
                        <>
                          <li>
                      admin
                            <div style={{ transform: 'rotate(180deg)' }}>
                              <Link to='/admin'>
                                <ButtonIcon size='small' typebutton='subtle' />
                              </Link>
                            </div>
                          </li>
                        </>
                      ) : (<></>)
                    }
                    <li>
                      Jugar
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/play'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li>
                    <li>
                      Comprar
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/catalogo'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div></li>
                    <li>
                      Mis cartones
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/cartones'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li>
                    <li>
                      Mis pedidos
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/ordenes'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li>
                    {
                      entrada[0] ? (
                        <>
                          <li>
                            Entrada
                            <div style={{ transform: 'rotate(180deg)' }}>
                              <Link to='/entrada'>
                                <ButtonIcon size='small' typebutton='subtle' />
                              </Link>
                            </div>
                          </li>
                        </>
                      ) : <></>
                    }
                    <li>
                      Ayuda
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/help'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div></li>
                    <li>
                      Salir de mi cuenta
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <ButtonIcon size='small' typebutton='subtle' onClick={logoutHandler} />
                      </div>
                    </li>
                  </> :
                  <>
                    <li>
                      Ingresar
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/sign-in'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li>
                    <li>
                      Registrarme
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/sign-up'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li>
                    <li>
                      Ayuda
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/help'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div></li>
                  </>
              }
            </ul>
          </div> :
          <>
            <header className='headerHome'>
              <div className='contentHeaderHome'>
                <div className='banner'> </div>
                <div className='content'>
                  <h1>Bingoloteando</h1>
                  <div className='userName'>
                    <h1>{user.name}</h1>
                    <div className='lastIcon' onClick={menuHandler}>
                      <Icon type='list' width='24' height='24'/>
                    </div>
                  </div>
                </div>
                <div className='info'>
                  <h1>{varsBingo.title}</h1>
                  <p>{varsBingo.subTitle}</p>
                  <Card>
                    <Link to={play.estado !== 0 ? '/play' : ''}>
                      <div className='circule' >
                        <div style={{ background: play.estado !== 0 ? 'linear-gradient(114.44deg, #EB0055 0%, #FFFA80 100%)' : 'transparent' }}>
                          <div>
                            <img src={Img1}/>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className='countDown'>
                      <p>
                        {
                          (new Date('10/1/2022 2:45 PM') < new Date()) ? <></> :
                            <>
                              <span id='days' /> días / <span id='hours' /> horas / <span id='minutes' /> minutos / <span id='seconds' /> segundos
                            </>
                        }
                      </p>
                    </div>
                    <div className='buttons'>
                      <Link to={'/play'}>
                        <Button autoLogin={false}>Jugar!</Button>
                      </Link>
                      {
                        (new Date('10/1/2022 2:45 PM') < new Date()) ?
                          <>
                            <a href={(new Date('10/1/2021 2:45 PM') < new Date()) ? 'https://pucv-cl.zoom.us/j/98741573889?pwd=dU54WlpqVGxFcldqdFluK2JwVkpsZz09' : ''} target='_blank' rel='noopener noreferrer'>
                              <Button autoLogin={false} disabled={false} color={'#005BD4'}>Zoom</Button>
                            </a>
                          </> :
                          <>
                            <Button autoLogin={false} disabled={true} color={'#005BD4'}>Zoom</Button>
                          </>
                      }
                    </div>
                    {
                      load ?
                        <>
                          {
                            user.id ?
                              <>
                                <div className='contentItem'>
                                  <Link to='/catalogo'>
                                    <div className='itemHome'>
                                      <div>
                                        <Icon type='plass' width='30' height='30'/>
                                      </div>
                                      <p>Comprar cartones</p>
                                    </div>
                                  </Link>
                                  <Link to='cartones'>
                                    <div className='itemHome'>
                                      <div>
                                        <Icon type='eye' width='35' height='35' stroke='#4700AB' strokeWidth='2'/>
                                      </div>
                                      <p>Ver mis cartones</p>
                                    </div>
                                  </Link>
                                  <Link to='ordenes'>
                                    <div className='itemHome'>
                                      <div style={{ width: '35px', height: '35px' }}>
                                        <Icon type='trolley' width='35' height='35'/>
                                        {
                                          pedidos['_id'] &&
                                          <div className='bubble' style={{ transition: 'all 1s', fontSize: '15px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '-55px', left: '15px', width: '30px', height: '30px', borderRadius: '100%', border: 'solid #FCFCFC 3px', background: '#F4B740', color: '#FCFCFC' }}>1</div>
                                        }
                                      </div>
                                      <p>Mis  Pedidos</p>
                                    </div>
                                  </Link>
                                  <Link to='help'>
                                    <div className='itemHome'>
                                      <div>
                                        <Icon type='help' width='35' height='35'/>
                                      </div>
                                      <p>Ayuda</p>
                                    </div>
                                  </Link>
                                </div>

                                <div onClick={clickHandler} style={{ transform: 'rotate(-90deg)', position: 'initial !important', margin: '15px', width: '52px' }}>
                                  <Icon type='forward' width='45' height='45'/>
                                </div>
                              </> :
                              <>
                                <p>Para comprar tus cartones y poder jugar debes primero tener una cuenta.</p>
                                <div>
                                  <Link to='/sign-up'>
                                    <Button>Registrarme</Button>
                                  </Link>
                                  <Link to='/sign-in'>
                                    <Button typebutton='secondary'>Ingresar</Button>
                                  </Link>
                                </div>

                                <div onClick={clickHandler} style={{ transform: 'rotate(-90deg)', margin: '15px', width: '52px' }}>
                                  <Icon type='forward' width='45' height='45'/>
                                </div>
                              </>
                          }
                        </> :
                        <>
                          <div className='contentItem'>
                            <Link to=''>
                              <div className='itemHome'>
                                <Spiner />
                              </div>
                            </Link>
                            <Link to=''>
                              <div className='itemHome'>
                                <Spiner />
                              </div>
                            </Link>
                            <Link to=''>
                              <div className='itemHome'>
                                <Spiner />
                              </div>
                            </Link>
                            <Link to='help'>
                              <div className='itemHome'>
                                <div>
                                  <Icon type='help' width='35' height='35'/>
                                </div>
                                <p>Ayuda</p>
                              </div>
                            </Link>
                          </div>
                          <div onClick={clickHandler} style={{ transform: 'rotate(-90deg)', margin: '15px', width: '52px' }}>
                            <Icon type='forward' width='45' height='45'/>
                          </div>
                        </>
                    }
                  </Card>
                </div>
              </div>
            </header>
            <varsHome.home />
            <Footer/>
          </>
      }
    </>
  );
};

const mapSateToProps = (state)=>{
  return {
    user: state.user,
    pedidos: state.ordenes.enProgreso,
    play: state.play,
    load: state.load,
    varsBingo: state.vars,
    entrada: state.entrada,
  };
};

const mapDispatchToProps = {
  updateState,
  logoutRequest,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
