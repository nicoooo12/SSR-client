import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from '../utils/Auth';

import Home from '../containers/Home';
import Catalogo from '../containers/Catalogo';
import Compra from '../containers/Compra';
import Cartones from '../containers/Cartones';
import Ordenes from '../containers/Ordenes';
import Play from '../containers/Play';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Ayuda from '../containers/Ayuda';
import Contacto from '../containers/Contacto';
import Admin from '../containers/admin/Index';
import Tests from '../containers/Tests';
// import pay from '../containers/pagoPrueba';
import NotFound from '../containers/NotFound';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import { updateState, initialState, logoutRequest } from '../actions';
import '../assets/styles/App.scss';

const App = ({ isLogged, api, updateState, initialState, logoutRequest }) => {
  const socket = io();
  useEffect(()=>{
    socket.on('change', ()=>{
      updateState();
      socket.emit('ok');
    });
    socket.on(isLogged ? isLogged : 'change-noSignIn', ()=>{
      updateState();
      socket.emit('ok');
    });
    initialState();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' >
          <Home />
        </Route>
        <Route
          exact
          path='/catalogo'
          render={(props)=> (
            <Auth login {...props}>
              <Catalogo />
            </Auth>
          )
          }
        />
        <Route
          exact
          path='/compra'
          render={(props)=> (
            <Auth login {...props}>
              <Compra />
            </Auth>
          )
          }
        />
        <Route
          exact
          path='/ordenes'
          render={(props)=> (
            <Auth login {...props}>
              <Ordenes />
            </Auth>
          )
          }
        />
        <Route
          exact
          path='/cartones'
          render={(props)=> (
            <Auth login {...props}>
              <Cartones />
            </Auth>
          )
          }
        />
        <Route
          exact
          path='/play'
          render={(props)=> (
            <Auth login {...props}>
              <Play socket={socket} />
            </Auth>
          )
          }
        />
        <Route exact path='/sign-in' render={(props) => <SignIn socket={socket} {...props} />}/>
        <Route exact path='/sign-up' component={SignUp} />
        <Route exact path='/help' component={Ayuda} />
        <Route exact path='/contacto' component={Contacto} />

        <Route
          exact
          path='/admin'
          render={(props)=> (
            <Auth login admin {...props}>
              <Admin />
            </Auth>
          )
          }
        />
        {/* <Route exact path='/admin/play' component={<>play</>} /> */}

        <Route
          exact
          path='/test'
          render={(props)=> (
            <Auth login {...props}>
              <Tests socket={socket} />
            </Auth>
          )
          }
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>);
};

const mapDispatchToProps = {
  updateState,
  initialState,
  logoutRequest,
};

export default connect(null, mapDispatchToProps)(App);
