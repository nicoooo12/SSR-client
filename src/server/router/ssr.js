/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import reducer from '../../frontend/reducers';
import serverRoutes from '../../frontend/router/serverRouter';
const axios = require('axios');
const config = require('../../../config');

const { v4: uuidv4 } = require('uuid');
// const debug = require('debug')('app:router:ssr');

const setResponse = (html, preloadedState, nonce) => (`
  <!DOCTYPE html>
  <html lang="es-Es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <link rel="stylesheet" href="/main.css">
  
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <title>Beta</title>
  </head>
  <body>
    <div id="react">${html}</div>
    <div id="modals"></div>
    <script id="preloadedState" nonce='${nonce}'>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script script src="/bundle.js" type="text/javascript"></script>
    </body>
    </html>
    
    `);
  // <script nonce='${nonce}' src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  // <script nonce='${nonce}' src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
  // <script nonce='${nonce}' src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>

const renderApp = async (req, res) => {

  const { token } = req.cookies;

  let initialState;

  try {
    const { data: initialStateServer } = await axios({
      method: 'get',
      headers: token ? { Authorization: `Bearer ${token}` } : { },
      url: `${config.apiUrl}/api/initialState`,
    });

    initialState = {
      'user': { ...initialStateServer.data.user },
      'redirect': '',
      'cartonesUser': [...initialStateServer.data.cartonesUser],
      'ordenes': {
        enProgreso: { ...initialStateServer.data.ordenes.enProgreso },
        terminadas: [...initialStateServer.data.ordenes.terminadas],
      },
      'catalogos': [...initialStateServer.data.catalogos],
      'play': { ...initialStateServer.data.play },
      'carrito': {
        active: false,
        state: 0,
        data: [],
      },
      'vars': {
        api: config.apiUrl,
        ...initialStateServer.data.vars,
      },
      'load': true,
    };
  } catch (error) {
    console.log('aaaa');
    initialState = {
      'user': {},
      'redirect': '',
      'cartonesUser': [],
      'ordenes': {
        enProgreso: {},
        terminadas: [],
      },
      'catalogos': [],
      'play': {
        estado: 0,
        serieJuego: 1,
      },
      'carrito': {
        active: false,
        state: 0,
        data: [],
      },
      'vars': {
        api: config.apiUrl,
      },
      'load': false,
    };
  }

  const nonceGenerator = uuidv4();
  res.set('Content-Security-Policy', `script-src-elem 'self' 'nonce-${nonceGenerator}';`);
  // console.log(initialState);
  const isLogged = (initialState.user.id);
  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes(isLogged))}
      </StaticRouter>
    </Provider>,
  );
  res.send(setResponse(html, preloadedState, nonceGenerator));
};

module.exports = (app) => {
  app.get('*', renderApp);
};
