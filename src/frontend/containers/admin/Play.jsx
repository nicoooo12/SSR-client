import React, { useEffect, useState } from 'react';
import Layout from '../../components/layouts/Layout';
import Button from '../../components/forms/Button';
import Input from '../../components/forms/Input';
import DropDown from '../../components/forms/DropDown';

import {
  changeEstadoPLay,
  changeSeriePlay,
} from '../../actions';

import { connect } from 'react-redux';

const Play = ({ user, socket, catalogo, play, changeEstadoPLay, changeSeriePlay }) => {

  const [serie, setSerie] = useState(play.serieJuego);
  const [estado, setEstado] = useState(play.estado);

  const changeEstadoPLayHandler = (n) => {
    socket.emit('play', n, serie);
    setEstado(n);
    changeEstadoPLay(n);
  };

  useEffect(()=>{
    socket.removeAllListeners();
    socket.emit('admin');
    socket.on('change', ()=>{
      updateState();
    });
    socket.on(user?.id ? user.id : 'change-noSignIn', ()=>{
      updateState();
    });
  }, []);

  return (
    <>
      <Layout to='/admin' title='Juego'>
        <div className='noTengo'>
          <h1>Control - Catalogo</h1>
          {
            catalogo?.map((e, i)=>{
              return (
                <>
                  <div key={i}>
                    <p>{e.titulo} - </p>
                    {/* <div /> */}
                    <Button autoLogin={false} size={'small'} typebutton={e.enVenta ? 'primary' : 'secondary'} disabled={!!e.enVenta}>Abrir</Button>
                    <Button autoLogin={false} size={'small'} typebutton={e.enVenta ? 'secondary' : 'primary'} disabled={!e.enVenta}>Cerrar</Button>
                  </div>
                </>
              );
            })
          }
        </div>
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
            <DropDown placeholder='hola' value={catalogo?.filter((e)=>e.serie === serie)[0].titulo}>
              {
                catalogo?.map((e, i)=>{
                  return <option value={e.titulo} key={i} />;
                })
              }
            </DropDown>
            <Button autoLogin={false} size={'small'} typebutton={'primary'} >Change</Button>
            <br />
            <br />
            <hr />
            <br />
            <br />
          </div>
          <div>
            <h2>Pantalla: </h2>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} >Init</Button>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} >Get State</Button>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} >Send State</Button>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} >Reset</Button>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} >Finish</Button>
            <br />
            <br />
            <hr />
            <br />
            <br />
          </div>
          <div>
            <h2>Juego: </h2>
            <div>
              <Input placeholder={'Numero'}/>
              <Button onClick={()=>{socket.emit('colorear_', 1);}} autoLogin={false} size={'small'} type='submit' typebutton={'primary'} >Cantar</Button>
            </div>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} >Bingo!</Button>
            <Button autoLogin={false} size={'small'} typebutton={'secondary'} >Rechazar</Button>
            {/* <Button autoLogin={false} size={'small'} typebutton={'secondary'} >Lanzar</Button> */}

          </div>
        </div>
        <div className='noTengo'>
          <h1>Validar cartones</h1>
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
