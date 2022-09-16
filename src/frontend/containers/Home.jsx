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

import '../assets/styles/containers/menu.scss';
import '../assets/styles/containers/Home.scss';

const App = ({ load, varsBingo, pedidos, play, user, updateState, logoutRequest })=> {
  const [first, setFirst] = useState(true);
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

  const clickHandler = ()=>{
    document.querySelector('#react').scrollTo(0, document.querySelector('header').offsetHeight);
  };

  const logoutHandler = ()=>{
    document.cookie = 'token=';
    document.cookie = 'email=';
    document.cookie = 'name=';
    document.cookie = 'id=';
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
                    {/* <li>
                      Cuenta
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/cuenta'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li> */}
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
                  <div className='lastIcon' onClick={menuHandler}>
                    <Icon type='list' width='24' height='24'/>
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
                                        <Icon type='eye' width='35' height='35' strokeWidth='2'/>
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
  };
};

const mapDispatchToProps = {
  updateState,
  logoutRequest,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
