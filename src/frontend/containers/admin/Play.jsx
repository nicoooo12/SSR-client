import React, { useEffect, useState } from 'react';
import Layout from '../../components/layouts/Layout';
import Button from '../../components/forms/Button';
import Input from '../../components/forms/Input';
import DropDown from '../../components/forms/DropDown';

import Carton from '../../components/Carton2';

import {
  changeEstadoPLay,
  changeSeriePlay,
} from '../../actions';

import { connect } from 'react-redux';

const Play = ({ user, socket, catalogo, play, changeEstadoPLay, changeSeriePlay }) => {

  const InputSerie = React.createRef(InputSerie);
  const InputNumero = React.createRef(InputNumero);

  const [Revision, setRevision] = useState(<></>);
  const [serie, setSerie] = useState(play.serieJuego);
  const [estado, setEstado] = useState(play.estado);
  const [bingo, setBingo] = useState([]);
  const [lanzados, setLanzados] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const changeEstadoPLayHandler = (n) => {
    socket.emit('play', n, serie);
    setEstado(n);
    changeEstadoPLay(n);
  };

  const changeSeriePlayHandler = () => {
    const n = +InputSerie.current.children[0].value;
    console.log(n);
    socket.emit('play', estado, n);
    setSerie(n);
    changeSeriePlay(n, ()=>{}, ()=>{});
  };
  useEffect(()=>{
    socket.removeAllListeners();
    socket.on(user.id, ()=>{
      updateState();
      socket.emit('ok');
    });
    socket.emit('admin');
    socket.on('change', ()=>{
      updateState();
    });
    socket.on(user?.id ? user.id : 'change-noSignIn', ()=>{
      updateState();
    });
    socket.on('play', async (username, data, number, id)=>{
      // console.log(bingo);
      // console.log([...bingo, { username, data, number, id }]);
      setBingo([...bingo, { username, data, number, id }]);
    });
    socket.on('returnGetState', (data)=>{
      setLanzados(data);
    });
  }, []);

  return (
    <>
      <Layout to='/admin' title='Juego'>
        {/* <div className='noTengo'>
          <h1>Control - Catalogo</h1>
          {
            catalogo?.map((e, i)=>{
              return (
                <>
                  <div key={i}>
                    <p>{e.titulo} - </p>
                    <Button autoLogin={false} size={'small'} typebutton={e.enVenta ? 'primary' : 'secondary'} disabled={!!e.enVenta}>Abrir</Button>
                    <Button autoLogin={false} size={'small'} typebutton={e.enVenta ? 'secondary' : 'primary'} disabled={!e.enVenta}>Cerrar</Button>
                  </div>
                </>
              );
            })
          }
        </div> */}
        <div className='noTengo'>
          <h1>Control - Juego</h1>
          <div>
            <h2>Estado: </h2>
            <Button autoLogin={false} size={'small'} typebutton={estado === 0 ? 'primary' : 'secondary'} disabled={estado === 0 ? true : ''} onClick={()=>{changeEstadoPLayHandler(0);}} >Off</Button>
            <Button autoLogin={false} size={'small'} typebutton={estado === 1 ? 'primary' : 'secondary'} disabled={estado === 1 ? true : ''} onClick={()=>{changeEstadoPLayHandler(1);}} >Espera</Button>
            <Button autoLogin={false} size={'small'} typebutton={estado === 2 ? 'primary' : 'secondary'} disabled={estado === 2 ? true : ''} onClick={()=>{changeEstadoPLayHandler(2);}} >Juego</Button>
            <Button autoLogin={false} size={'small'} typebutton={estado === 3 ? 'primary' : 'secondary'} disabled={estado === 3 ? true : ''} onClick={()=>{changeEstadoPLayHandler(3);}} >pruebas</Button>
            <br />
            <br />
            <hr />
            <br />
            <br />
          </div>
          <div>
            <h2>Serie: </h2>
            <DropDown Ref={InputSerie} placeholder='hola' value={serie}>
              {
                catalogo?.map((e, i)=>{
                  return <option label={e.titulo} value={e.serie} key={i} />;
                })
              }
            </DropDown>
            <Button autoLogin={false} size={'small'} typebutton={'primary'} onClick={changeSeriePlayHandler} >Change</Button>
            <br />
            <br />
            <hr />
            <br />
            <br />
          </div>
          <div>
            <h2>Pantalla: </h2>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} onClick={()=>{socket.emit('Init', serie, 1);}}>Premio 1</Button>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} onClick={()=>{socket.emit('Init', serie, 2);}}>Premio 2</Button>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} onClick={()=>{socket.emit('Init', serie, 3);}}>Premio 3</Button>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} onClick={()=>{socket.emit('GetState');}} >Get State</Button>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} onClick={()=>{confirm('seguro que quieres mandar tu estado ?') ? socket.emit('SendState', lanzados) : false;}} >Send State</Button>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} onClick={()=>{confirm('seguro que quieres restaurar todo ?') ? socket.emit('Reset') : false;}} >Reset</Button>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} onClick={()=>{socket.emit('End');}} >Finish</Button>
            <br />
            <br />
            <hr />
            <br />
            <br />
          </div>
          <div>
            <h2>Juego: </h2>
            <div>
              <Input Ref={InputNumero} placeholder={'Numero'}/>
              <Button onClick={()=>{
                const n = +InputNumero.current.children[0].value;
                const current = lanzados;
                current[n] = lanzados[n] === 0 ? 1 : 0;
                setLanzados(current);
                socket.emit('colorear_', n);
              }} autoLogin={false} size={'small'} type='submit' typebutton={'primary'}
              >Cantar</Button>
            </div>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} >Bingo!</Button>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} >Rechazar</Button>
            {/* <Button autoLogin={false} size={'small'} typebutton={'secondary'} >Lanzar</Button> */}

          </div>
        </div>
        <div className='noTengo'>
          <h1>Validar cartones {bingo.length}</h1>
          {/* data, number, id */}
          {
            Revision
          }
          <hr />
          {
            bingo.map((e, i)=>{
              return (
                <div key={i}>
                  {e.username}:
                  <Button autoLogin={false} size={'small'} typebutton={'secondary'} onClick={()=>{socket.emit('BingoS', e.username);}} >Bingo!</Button>
                  <Button autoLogin={false} size={'small'} typebutton={'secondary'} onClick={()=>{setRevision(<Carton lanzados={lanzados} data={e.data} serie={e.serie} />);}} >Revisar</Button>
                  <Button autoLogin={false} size={'small'} typebutton={'secondary'} onClick={()=>{console.log(e.id); socket.emit('BingoReject', e.id);}}>Rechazar</Button>
                  <Button autoLogin={false} size={'small'} typebutton={'secondary'} onClick={()=>{socket.emit('BingoGanador', e.username);}}>Ganador!</Button>
                  <hr />
                </div>
              );
            })
          }
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = (state)=>{
  return {
    user: state.user,
    catalogo: state.catalogos,
    play: state.play,
  };
};

const mapDispatchToProps = {
  changeEstadoPLay,
  changeSeriePlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
