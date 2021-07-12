import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '@containers/Home';
import Catalogo from '@containers/Catalogo';
import Compra from '@containers/Compra';
import Cartones from '@containers/Cartones';
import Ordenes from '@containers/Ordenes';
import Play from '@containers/Play';
import SignIn from '@containers/SignIn';
import SignUp from '@containers/SignUp';
import Ayuda from '@containers/Ayuda';
import Contacto from '@containers/Contacto';
// import pay from '@containers/pagoPrueba';
import Notfound from '@containers/Notfound';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import { updateState, initialState } from '../actions';
import '../assets/styles/App.scss';

const App = ({ isLogged, api, updateState, initialState }) => {
  const socket = io(api);
  console.log(api);
  useEffect(()=>{
    socket.on('change', ()=>{
      console.log('[changes in the State of socket]');
      updateState();
      socket.emit('ok');
    });
    socket.on(isLogged ? isLogged : 'change-noSignIn', ()=>{
      console.log('[changes in the State of socket]');
      updateState();
      socket.emit('ok');
    });
    initialState();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/catalogo' component={Catalogo} />
        <Route exact path='/compra' component={Compra} />
        <Route exact path='/ordenes' component={Ordenes} />
        <Route exact path='/cartones' component={Cartones} />
        <Route exact path='/play' render={(props) => <Play socket={socket} {...props} />} />
        <Route exact path='/sign-in' render={(props) => <SignIn socket={socket} {...props} />}/>
        <Route exact path='/sign-up' component={SignUp} />
        <Route exact path='/help' component={Ayuda} />
        <Route exact path='/contacto' component={Contacto} />
        {/* <Route exact path='/pay' component={pay} /> */}
        <Route component={Notfound} />
      </Switch>
    </BrowserRouter>);
};

const mapDispatchToProps = {
  updateState,
  initialState,
};

export default connect(null, mapDispatchToProps)(App);
