import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import Layout from '../components/layouts/Layout';
import { Link } from 'react-router-dom';
import Button from '../components/forms/Button';
import Badges from '../components/display/Badges';
import Icon from '../components/display/Icon';

import '../assets/styles/containers/Play.scss';

const misCartonesDePruebas = [
  {
    data: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, '🍕', 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]],
    play: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
    serie: 0,
    title: 'Carton de pruebas',
  },
  {
    data: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, '🍕', 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]],
    play: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
    serie: 0,
    title: 'Carton de pruebas',
  },
  {
    data: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, '🍕', 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]],
    play: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
    serie: 0,
    title: 'Carton de pruebas',
  },
  {
    data: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, '🍕', 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]],
    play: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
    serie: 0,
    title: 'Carton de pruebas',
  },
  {
    data: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, '🍕', 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]],
    play: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
    serie: 0,
    title: 'Carton de pruebas',
  },
];

const Play = ({ user, history, play, misCartones, catalogos, socket }) => {

  const [mess, setMess] = useState('');
  const [key, setKey] = useState(play.estado);
  const [serie, setSerie] = useState(play.serieJuego);
  const [color1, setColor1] = useState(catalogos.filter((e)=>e.serie === serie)[0] ? catalogos.filter((e)=>e.serie === serie)[0].color : '#2A00AF');
  const [color2, setColor2] = useState(catalogos.filter((e)=>e.serie === serie)[0] ? catalogos.filter((e)=>e.serie === serie)[0].color : '#2A00AF');
  const [pint, setPint] = useState([
    ...misCartones.map((e)=>{
      return e.play;
    }),
    ...misCartonesDePruebas.map((e)=>{
      return e.play;
    }),
  ]);
  const [direction, setDirection] = useState(1);
  const [first, setFirst] = useState(true);

  const curiosityMessage = () => {
    const currentMess = [
      'El Bingo fue utilizado originalmente por los alemanes como una forma de enseñar a los niños los números, las tablas de multiplicar e historia.',
      'De acuerdo al libro de Récords Guinness, el juego de Bingo en línea con más jugadores se realizó en 2010 en Japón, con un total de 493,824 participantes.',
      'Según un cálculo, en una tarjeta estándar de jugador puede obtener 1,474,200 combinaciones ganadoras diferentes.',
      'Para alejar la mala suerte, los jugadores supersticiosos rodean sus sillas tres veces antes de sentarse.',
      'Los cartones de bingo fueron creados por Carl Leffler, profesor de matemáticas de la Universidad de Columbia, quien en 1930 había creado más de 6000 tarjetas de bingo con combinaciones únicas. La historia dice que después de este trabajo, Leffler se volvió loco.',
      'No existen trucos ni estrategias para ganar en el Bingo. Ya sea en vivo o en línea, los resultados son completamente aleatorios, así que no hay manera de saber qué números saldrán.',
      'Muchos creen que el Bingo es un “juego para personas mayores” pero la realidad es que el Bingo atrae a personas de todas las edades.',
      'Mientras que juegos como el Monopoly pueden desatar la ira y enfrentar a familias enteras por disputas de carácter monetario, el Bingo se revela como una alternativa que mejora las capacidades cognitivas de las personas y alivia profundamente el estrés.',
    ][Math.round(Math.random() * 7)];
    setMess(currentMess);
  };

  const changeHandler = (r, o, item)=>{
    if (pint[item][r][o]) {
      setPint(
        pint.map((q, indexA)=>{
          return q.map((g, indexB)=>{
            if (indexA === item) {
              return g.map((n, indexC)=>{
                if (indexB === r) {
                  return indexC === o ? false : n;
                }
                return n;
              });
            }
            return g;
          });
        }),
      );
    } else {
      setPint(
        pint.map((q, indexA)=>{
          return q.map((g, indexB)=>{
            if (indexA === item) {
              return g.map((n, indexC)=>{
                if (indexB === r) {
                  return indexC === o ? true : n;
                }
                return n;
              });
            }
            return g;
          });
        }));
    }

  };

  useEffect(()=>{
    socket.removeAllListeners();
    curiosityMessage();
    socket.on('connected', (estado, serie)=>{
      setKey(estado);
      setSerie(serie);
      // setCatalogoJuego(catalogos.filter((e)=>e.serie === serie)[0]);
      setColor1(catalogos.filter((e)=>e.serie === serie)[0].color);
      setColor2(catalogos.filter((e)=>e.serie === serie)[0].color);
    });

    socket.on('Play', (estado, serie)=>{
      setKey(estado);
      setSerie(serie);
      // setCatalogoJuego(catalogos.filter((e)=>e.serie === serie)[0]);
      setColor1(catalogos.filter((e)=>e.serie === serie)[0].color);
      setColor2(catalogos.filter((e)=>e.serie === serie)[0].color);
    });

    if (first) {
      socket.emit('connectPlay');
      setKey(play.estado);
      setSerie(play.serieJuego);
      setColor1(catalogos.filter((e)=>e.serie === play.serieJuego)[0].color);
      setColor2(catalogos.filter((e)=>e.serie === play.serieJuego)[0].color);
      setFirst(false);
    }
  }, []);

  switch (key) {
    case 0:
      return (
        <div className='play' >
          <Layout to='/' title='A jugar!'>
            <div className='noTengo'>
              <h1>Aun<br/>no iniciamos...</h1>
              <p>Ya tienes tu carton?</p>
              <Link to='catalogo'>
                <Button>Ir a comprar</Button>
              </Link>
            </div>
          </Layout>
        </div>
      );
    case 1:
      return (
        <Layout to='/' title='Sala de espera'>
          <div className='play noTengo' >
            <h1>Estamos preparando todo.</h1>
            <p style={{ marginBottom: '25px' }}>{ play.comment }</p>
            <p style={{ color: '#000000a1', fontSize: '10px' }} onClick={curiosityMessage}>
              <b>Sabias que: </b>{mess}
              {/* {play.comment} */}
            </p>
          </div>
        </Layout>
      );
    case 2:
      if (!misCartones[0] || !misCartones.filter((e)=>{return e.serie === serie;})[0]) {
        return (
          <Layout to='/' title='Sala de espera'>
            <div className='play noTengo' >
              <h1>No tienes cartones para este juego.</h1>
              <p>Espera un poco ;)</p>
            </div>
          </Layout>
        );
      }
      return (
        <Layout to='/' >
          <div className='play' >
            <div className='carton'>
              <div className='carton__title-content'>
                <div>
                  <h1 className='carton__title'>
                    {catalogos.filter((e)=>{
                      // console.log(e.serie === serie);
                      return e.serie === serie;
                    })[0].titulo}
                  </h1>
                  <Badges>Serie en juego: {serie} </Badges>
                </div>
                <div
                  className='row'
                  onClick={()=>{
                    if (direction === 0) {
                      setDirection(1);
                    } else {
                      setDirection(0);
                    }
                  }}
                  style={{
                    transform: `rotate(${direction === 0 ? '-180' : '-90'}deg)`,
                  }}
                >
                  <Icon type='row' />
                </div>
              </div>
              <div className='carton__content'>
                <div className='hidden-data'>
                  <div className='data' style={
                    {
                      width: `calc(100% * ${direction === 0 ? misCartones.filter((e)=>{return e.serie === serie;}).length : '1' })`,
                      maxWidth: `calc(400px * ${misCartones.filter((e)=>{return e.serie === serie;}).length })`,
                      flexWrap: `${direction === 0 ? 'nowrap' : 'wrap'}`,
                      justifyContent: `${direction === 0 ? 'space-between' : 'center'}`,
                    }}
                  >
                    {
                      misCartones.map((e, index)=>{
                        return (
                          <div className='item' key={index} id={e.serie} style={{ margin: '10px 10px' }}>
                            <table className='carton__table'>
                              <thead>
                                <tr style={{
                                  border: `${color1} solid`,
                                }}
                                >
                                  <th style={{ background: color1 }}>B</th>
                                  <th style={{ background: color1 }}>I</th>
                                  <th style={{ background: color1 }}>N</th>
                                  <th style={{ background: color1 }}>G</th>
                                  <th style={{ background: color1 }}>O</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][0][0] ? color2 : 'transparent'}`,
                                        color: `${pint[index][0][0] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(0, 0, index);}
                                    }
                                  >{e.data[0][0]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][1][0] ? color2 : 'transparent'}`,
                                        color: `${pint[index][1][0] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(1, 0, index);}
                                    }
                                  >{e.data[1][0]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][2][0] ? color2 : 'transparent'}`,
                                        color: `${pint[index][2][0] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(2, 0, index);}
                                    }
                                  >{e.data[2][0]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][3][0] ? color2 : 'transparent'}`,
                                        color: `${pint[index][3][0] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(3, 0, index);}
                                    }
                                  >{e.data[3][0]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][4][0] ? color2 : 'transparent'}`,
                                        color: `${pint[index][4][0] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(4, 0, index);}
                                    }
                                  >{e.data[4][0]}</td>
                                </tr>
                                <tr>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][0][1] ? color2 : 'transparent'}`,
                                        color: `${pint[index][0][1] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(0, 1, index);}
                                    }
                                  >{e.data[0][1]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][1][1] ? color2 : 'transparent'}`,
                                        color: `${pint[index][1][1] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(1, 1, index);}
                                    }
                                  >{e.data[1][1]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][2][1] ? color2 : 'transparent'}`,
                                        color: `${pint[index][2][1] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(2, 1, index);}
                                    }
                                  >{e.data[2][1]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][3][1] ? color2 : 'transparent'}`,
                                        color: `${pint[index][3][1] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(3, 1, index);}
                                    }
                                  >{e.data[3][1]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][4][1] ? color2 : 'transparent'}`,
                                        color: `${pint[index][4][1] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(4, 1, index);}
                                    }
                                  >{e.data[4][1]}</td>
                                </tr>
                                <tr>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][0][2] ? color2 : 'transparent'}`,
                                        color: `${pint[index][0][2] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(0, 2, index);}
                                    }
                                  >{e.data[0][2]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][1][2] ? color2 : 'transparent'}`,
                                        color: `${pint[index][1][2] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(1, 2, index);}
                                    }
                                  >{e.data[1][2]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][2][2] ? color2 : 'transparent'}`,
                                        color: `${pint[index][2][2] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(2, 2, index);}
                                    }
                                  >{e.data[2][2]}{/*X*/}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][3][2] ? color2 : 'transparent'}`,
                                        color: `${pint[index][3][2] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(3, 2, index);}
                                    }
                                  >{e.data[3][2]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][4][2] ? color2 : 'transparent'}`,
                                        color: `${pint[index][4][2] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(4, 2, index);}
                                    }
                                  >{e.data[4][2]}</td>
                                </tr>
                                <tr>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][0][3] ? color2 : 'transparent'}`,
                                        color: `${pint[index][0][3] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(0, 3, index);}
                                    }
                                  >{e.data[0][3]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][1][3] ? color2 : 'transparent'}`,
                                        color: `${pint[index][1][3] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(1, 3, index);}
                                    }
                                  >{e.data[1][3]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][2][3] ? color2 : 'transparent'}`,
                                        color: `${pint[index][2][3] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(2, 3, index);}
                                    }
                                  >{e.data[2][3]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][3][3] ? color2 : 'transparent'}`,
                                        color: `${pint[index][3][3] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(3, 3, index);}
                                    }
                                  >{e.data[3][3]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][4][3] ? color2 : 'transparent'}`,
                                        color: `${pint[index][4][3] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(4, 3, index);}
                                    }
                                  >{e.data[4][3]}</td>
                                </tr>
                                <tr>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][0][4] ? color2 : 'transparent'}`,
                                        color: `${pint[index][0][4] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(0, 4, index);}
                                    }
                                  >{e.data[0][4]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][1][4] ? color2 : 'transparent'}`,
                                        color: `${pint[index][1][4] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(1, 4, index);}
                                    }
                                  >{e.data[1][4]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][2][4] ? color2 : 'transparent'}`,
                                        color: `${pint[index][2][4] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(2, 4, index);}
                                    }
                                  >{e.data[2][4]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][3][4] ? color2 : 'transparent'}`,
                                        color: `${pint[index][3][4] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(3, 4, index);}
                                    }
                                  >{e.data[3][4]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][4][4] ? color2 : 'transparent'}`,
                                        color: `${pint[index][4][4] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(4, 4, index);}
                                    }
                                  >{e.data[4][4]}</td>
                                </tr>
                              </tbody>
                            </table>
                            <div className='foot'>
                              <Button size='small' color={color1} onClick={(o)=>{socket.emit('Bingo', user.name, e.data, index); socket.on('bingoReject', (e)=>{if (e === index) {o(); alert('Ups! Parece que no :C No te rindas, revisa bien tus cartones y suerte para la proxima!!');}}); socket.on('resetAllBingo', ()=>{o();});}} >Bingo!</Button>
                              <Badges>Numero: {index} </Badges>
                            </div>
                          </div>);
                      }).filter((e)=>{
                        // console.log(e);
                        return e.props.id === serie;
                      }).map((e)=>{
                        return e;
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    case 3:
      return (
        <Layout to='/' title='' >
          <div className='play' >

            <div className='carton'>
              <div className='carton__title-content'>
                <div>
                  <h1 className='carton__title'>
                    Carton de pruebas
                  </h1>
                  <Badges>Prueba</Badges>
                </div>
                <div
                  className='row'
                  onClick={()=>{
                    if (direction === 0) {
                      setDirection(1);
                    } else {
                      setDirection(0);
                    }
                  }}
                  style={{
                    transform: `rotate(${direction === 0 ? '-180' : '-90'}deg)`,
                  }}
                >
                  <Icon type='row' />
                </div>
              </div>
              <div className='carton__content'>
                <div className='hidden-data'>
                  <div className='data' style={
                    {
                      width: `calc(100% * ${direction === 0 ? misCartonesDePruebas.filter((e)=>{return e.serie === 0;}).length : '1' })`,
                      maxWidth: `calc(400px * ${misCartonesDePruebas.filter((e)=>{return e.serie === 0;}).length })`,
                      flexWrap: `${direction === 0 ? 'nowrap' : 'wrap'}`,
                      justifyContent: `${direction === 0 ? 'space-between' : 'center'}`,
                    }}
                  >
                    {
                      misCartonesDePruebas.map((e, index)=>{
                        return (
                          <div className='item' key={index} id={e.serie} style={{ margin: '10px 10px' }}>
                            <table className='carton__table'>
                              <thead>
                                <tr style={{
                                  border: `${color1} solid`,
                                }}
                                >
                                  <th style={{ background: color1 }}>B</th>
                                  <th style={{ background: color1 }}>I</th>
                                  <th style={{ background: color1 }}>N</th>
                                  <th style={{ background: color1 }}>G</th>
                                  <th style={{ background: color1 }}>O</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][0][0] ? color2 : 'transparent'}`,
                                        color: `${pint[index][0][0] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(0, 0, index);}
                                    }
                                  >{e.data[0][0]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][1][0] ? color2 : 'transparent'}`,
                                        color: `${pint[index][1][0] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(1, 0, index);}
                                    }
                                  >{e.data[1][0]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][2][0] ? color2 : 'transparent'}`,
                                        color: `${pint[index][2][0] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(2, 0, index);}
                                    }
                                  >{e.data[2][0]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][3][0] ? color2 : 'transparent'}`,
                                        color: `${pint[index][3][0] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(3, 0, index);}
                                    }
                                  >{e.data[3][0]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][4][0] ? color2 : 'transparent'}`,
                                        color: `${pint[index][4][0] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(4, 0, index);}
                                    }
                                  >{e.data[4][0]}</td>
                                </tr>
                                <tr>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][0][1] ? color2 : 'transparent'}`,
                                        color: `${pint[index][0][1] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(0, 1, index);}
                                    }
                                  >{e.data[0][1]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][1][1] ? color2 : 'transparent'}`,
                                        color: `${pint[index][1][1] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(1, 1, index);}
                                    }
                                  >{e.data[1][1]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][2][1] ? color2 : 'transparent'}`,
                                        color: `${pint[index][2][1] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(2, 1, index);}
                                    }
                                  >{e.data[2][1]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][3][1] ? color2 : 'transparent'}`,
                                        color: `${pint[index][3][1] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(3, 1, index);}
                                    }
                                  >{e.data[3][1]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][4][1] ? color2 : 'transparent'}`,
                                        color: `${pint[index][4][1] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(4, 1, index);}
                                    }
                                  >{e.data[4][1]}</td>
                                </tr>
                                <tr>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][0][2] ? color2 : 'transparent'}`,
                                        color: `${pint[index][0][2] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(0, 2, index);}
                                    }
                                  >{e.data[0][2]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][1][2] ? color2 : 'transparent'}`,
                                        color: `${pint[index][1][2] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(1, 2, index);}
                                    }
                                  >{e.data[1][2]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][2][2] ? color2 : 'transparent'}`,
                                        color: `${pint[index][2][2] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(2, 2, index);}
                                    }
                                  >{e.data[2][2]}{/*X*/}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][3][2] ? color2 : 'transparent'}`,
                                        color: `${pint[index][3][2] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(3, 2, index);}
                                    }
                                  >{e.data[3][2]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][4][2] ? color2 : 'transparent'}`,
                                        color: `${pint[index][4][2] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(4, 2, index);}
                                    }
                                  >{e.data[4][2]}</td>
                                </tr>
                                <tr>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][0][3] ? color2 : 'transparent'}`,
                                        color: `${pint[index][0][3] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(0, 3, index);}
                                    }
                                  >{e.data[0][3]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][1][3] ? color2 : 'transparent'}`,
                                        color: `${pint[index][1][3] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(1, 3, index);}
                                    }
                                  >{e.data[1][3]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][2][3] ? color2 : 'transparent'}`,
                                        color: `${pint[index][2][3] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(2, 3, index);}
                                    }
                                  >{e.data[2][3]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][3][3] ? color2 : 'transparent'}`,
                                        color: `${pint[index][3][3] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(3, 3, index);}
                                    }
                                  >{e.data[3][3]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][4][3] ? color2 : 'transparent'}`,
                                        color: `${pint[index][4][3] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(4, 3, index);}
                                    }
                                  >{e.data[4][3]}</td>
                                </tr>
                                <tr>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][0][4] ? color2 : 'transparent'}`,
                                        color: `${pint[index][0][4] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(0, 4, index);}
                                    }
                                  >{e.data[0][4]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][1][4] ? color2 : 'transparent'}`,
                                        color: `${pint[index][1][4] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(1, 4, index);}
                                    }
                                  >{e.data[1][4]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][2][4] ? color2 : 'transparent'}`,
                                        color: `${pint[index][2][4] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(2, 4, index);}
                                    }
                                  >{e.data[2][4]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][3][4] ? color2 : 'transparent'}`,
                                        color: `${pint[index][3][4] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(3, 4, index);}
                                    }
                                  >{e.data[3][4]}</td>
                                  <td
                                    style={
                                      {
                                        border: `${color1} solid`,
                                        background: `${pint[index][4][4] ? color2 : 'transparent'}`,
                                        color: `${pint[index][4][4] ? '#FCFCFC' : '#14142B'}`,
                                      }
                                    }
                                    onClick={
                                      ()=>{changeHandler(4, 4, index);}
                                    }
                                  >{e.data[4][4]}</td>
                                </tr>
                              </tbody>
                            </table>
                            <div className='foot'>
                              <Button size='small' color={color1} onClick={(o)=>{socket.emit('Bingo', user.name, e.data, index); socket.on('bingoReject', (e)=>{if (e === index) {o(); alert('Ups! Parece que no :C\nNo te rindas, revisa bien tus cartones y suerte para la proxima!!');}}); socket.on('resetAllBingo', ()=>{o();});}} >Bingo!</Button>
                              <Badges>Numero: {index} </Badges>
                            </div>
                          </div>);
                      }).filter((e)=>{
                        // console.log(e);
                        return e.props.id === 0;
                      }).map((e)=>{
                        return e;
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    default:
      return <>Error</>;
  }
};

const mapStateToProps = (state)=>{
  return {
    misCartones: state.cartonesUser,
    catalogos: state.catalogos,
    play: state.play,
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Play);
