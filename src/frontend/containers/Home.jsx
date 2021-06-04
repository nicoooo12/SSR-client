import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// import Header from '../components/Header-A';
import Footer from '../components/Footer';
// import Carrusel from '../components/Carrusel';
import ButtonIcon from '../components/forms/ButtonIcon';
import Button from '../components/forms/Button';
import Modal from '../components/modal';
// import RegisterPanel from '../components/RegisterPanel';
import { updateState, logoutRequest } from '../actions';
import { Link } from 'react-router-dom';
import Icon from '../components/display/Icon';
import Card from '../components/display/Card';

import Img1 from '../assets/images/B.png';

import _1 from '../assets/images/1.png';
import _2 from '../assets/images/2.png';
import _3 from '../assets/images/3.png';
import _4 from '../assets/images/4.png';
import _5 from '../assets/images/5.png';

import '../assets/styles/containers/menu.scss';
import '../assets/styles/containers/Home.scss';
const App = ({ user, updateState, logoutRequest })=> {
  const [first, setFirst] = useState(true);
  useEffect(()=>{
    if (first) {
      setFirst(false);
      document.querySelector('#react').scrollTo(0, 0);
    }
  }, []);
  const [menu, setMenu] = useState(false);
  const [focusHeader, setFocusHeader] = useState(true);
  let observer;
  useEffect(()=>{
    observer = new IntersectionObserver((entry, observer)=>{
      if (entry[0].isIntersecting) {
        setFocusHeader(true);
      } else {
        setFocusHeader(false);
      }
    });
    observer.observe(document.querySelector('.headerHome'));
  }, [observer]);

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
    document.cookie = 'email=';
    document.cookie = 'name=';
    document.cookie = 'id=';
    document.cookie = 'token=';
    logoutRequest();
    updateState();
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
                      Mis ordenes
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
                      Comprar
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/catalogo'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div></li>
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
            {
              focusHeader ?
                <>
                  <div className='contentLibre-off'> </div>
                </> :
                <>
                  <div className='contentLibreHome'>
                    <h1>Bingoloteando</h1>
                    <div className='lastIcon' onClick={menuHandler}>
                      <Icon type='list' width='24' height='24'/>
                    </div>
                  </div>
                </>
            }
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
                  <h1>Titulo Evento</h1>
                  <p>Apoyemos a esta causa o algo así</p>
                  <Card>
                    <div className='circule' >
                      <div>
                        <div>
                          <img src={Img1}/>
                        </div>
                      </div>
                    </div>
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
                                  <Icon type='eye' width='35' height='35'/>
                                </div>
                                <p>Ver mis cartones</p>
                              </div>
                            </Link>
                            <Link to='ordenes'>
                              <div className='itemHome'>
                                <div>
                                  <Icon type='trolley' width='35' height='35'/>
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

                          <div onClick={clickHandler} style={{ transform: 'rotate(-90deg)', position: 'initial !important', margin: '15px' }}>
                            <Icon type='forward' width='45' height='45'/>
                          </div>
                        </> :
                        <>
                          <p>Para comprar tus cartones y poder jugar debes crear primero una cuenta.</p>
                          <div>
                            <Link to='/sign-up'>
                              <Button>Register</Button>
                            </Link>
                            <Link to='/sign-in'>
                              <Button typebutton='secondary'>Ingresar</Button>
                            </Link>
                          </div>

                          <div onClick={clickHandler} style={{ transform: 'rotate(-90deg)', position: 'initial !important', margin: '15px' }}>
                            <Icon type='forward' width='45' height='45'/>
                          </div>
                        </>
                    }
                  </Card>
                </div>
              </div>
            </header>

            <div className='banner-img' >
              <img src={_1} alt='' className='img' />
              <Modal btn='Más información'>
                <h1>Ayuda a Isabelita</h1>
                <p>
                Isabelita es una niña pequeña. Hace un par de meses, a Isabelita se le detectó un tumor en su cabeza. El tumor en cuestión es pequeño, más la locación dificulta el estudio del mismo y por ende su tratamiento.
                En este momento, se precisa hacer un tratamiento progresivo ara disminuir el tamaño del tumor sin perjudicar el crecimiento de Isabel, posteriormente se podría realizar una operación para extraer el tumor, todo depende de como progrese la condición. Como podrán suponer, el tratamiento no es nada barato, y de hecho solo la biopsia ha costado como mínimo quince millones de pesos, por lo dificultoso que es acceder al lugar donde se localiza el tumor, por ende se sobreentiende lo caro que será todo el proceso.<br/>
                Como generación y comunidad Saint Paul´s, hemos organizado este bingo en pos de recaudar fondos para el tratamiento y todos los gastos relacionados. nuestra esperanza y corazones estarán con isabelita.
                </p>
              </Modal>
            </div>

            <div className='banner-img' >
              <img src={_2} alt='' className='img' />
              <Modal btn='Más información' >
                <h1>Bingo!</h1>
                <p>
                Usted podrá comprar varios cartones, los cuales podrá jugar tanto en papel si decide imprimir el carton, o en la pantalla, pero para que el administrador del juego pueda verificar si ha ganado o no, debe debe siempre ir rellenando los espacios en la pantalla y presione un botón cunado crea que a ganado...<br/>
                Para comprar los bingos simplemente agregalos al carro y posterior mente haya a terminar la compra, realice la transferencia, envié el comprobante y luego de que sea revisado se liberará el cartón de bingo para usted.<br/>
                Habrá un total de seis bingos, el juego tendrá un animador de principió a fin para aligerar y entretener el ambiente.
                </p>
                <Link to='catalogo'>
                  <Button>Ir a comprar!</Button>
                </Link>
              </Modal>
            </div>

            <div className='banner-img' >
              <img src={_3} alt='' className='img' />
              <Modal btn='Ir ver' >
                <h1>Premios</h1>
                <p>
                Existen varios premios, lo más grandes obviamente se darán por cartón completo, pero también se entregarán premios menores por linea, o también por actividades interactivas como mini-concursos, que se planean hacer mientras se esté realizando el bingo.<br/>
                Si es que le gustaría donar premios lo agradeceríamos, y si lo desea de hecho por favor contactarse con &quot;ayudabingoisabel@gmail.com&quot;, pero resultaría más beneficioso para la causa que done directamente.
                </p>
              </Modal>
            </div>

            <div className='banner-img' >
              <img src={_5} alt='' className='img' />
              <Modal btn='Donar aquí!' >
                <h1>Has tu donaciones</h1>
                <p>
                Comprar los cartones no es la única forma de ayudar en esta noble causa, existen otras maneras de colaborar: Donar es una excelente opción. Si lo prefiere puedes colaborar de forma directa, ¡Cualquier cantidad sirve!
                Ayudar en esta causa significará un gran aporte para Isabelita y su familia. Si de verdad lo quiere realice una transferencia a la cuenta (información pendiente).
                </p>
              </Modal>
            </div>

            <div className='banner-img' >
              <img src={_4} alt='' className='img' />
              <Link to='help'>
                <Button autoLogin={false} > Ayuda!</Button>
              </Link>
            </div>
            <Footer/>
          </>
      }
    </>
  );
};

const mapSateToProps = (state)=>{
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  updateState,
  logoutRequest,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
