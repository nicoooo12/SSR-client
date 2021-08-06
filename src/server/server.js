const express = require('express');
const helmet = require('helmet');
const config = require('../../config');
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import reducer from '../frontend/reducers';
import serverRoutes from '../frontend/router/serverRouter';

const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

// require('./utils/auth/strategies/basic');

if (config.dev) {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config.dev.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    serverSideRender: true,
    publicPath: webpackConfig.output.publicPath,
  };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(`${__dirname}/../../dist`));
} else {
  app.use(express.static(`${__dirname}/../../dist`));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

const setResponse = (html, preloadedState, nonce) => {
  return (`
  <!DOCTYPE html>
  <html lang="es-Es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="assets/B.png" type="image/x-icon">
    <link rel="stylesheet" href="main.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <title>Bingoloteando</title>
  </head>
  <body>
    <div id="react">${html}</div>
    <script id="preloadedState" nonce='${nonce}'>
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script script src="bundle.js" type="text/javascript"></script>
  </body>
  </html>
  `);
};

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
  res.set('Content-Security-Policy', `script-src 'self' 'nonce-${nonceGenerator}';`);

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

// router
// app.use(express.static(`${__dirname}/../../public`));
require('./router/auth')(app);
require('./router/api')(app);
app.get('*', renderApp);

// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port} in ${config.dev ? 'development' : 'production'} mode`);
});
