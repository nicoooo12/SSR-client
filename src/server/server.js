import webpack from 'webpack';

const express = require('express');
const helmet = require('helmet');
const config = require('../../config');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const debugApp = require('debug')('app:index');
const jwt = require('jsonwebtoken');
const debugAppError = require('debug')('app:Error-index');

const app = express();

const server = require('http').createServer(app);
const { Server } = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');
const io = new Server(server, {
  cors: {
    origin: [
      'https://admin.socket.io',
    ],
    // credentials: true,
  },
});

instrument(io, {
  auth: {
    type: 'basic',
    username: config.socketUser,
    password: config.socketPassword,
  },
});

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.session());
app.disable('x-powered-by');
app.use(express.static(`${__dirname}/../../dist`));
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());

if (config.dev) {
  debugApp('Development config');
  const webPackConfig = require('../../webpack.config.dev');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webPackConfig);
  const serverConfig = {
    serverSideRender: true,
    publicPath: webPackConfig.output.publicPath,
    // writeToDisk: true,
  };
  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
  }));
  app.use(webpackDevMiddleware(compiler, serverConfig));
}

// router
app.use((req, res, next)=>{
  const { token } = req.cookies;
  if (!token) {
    return next();
  }
  return jwt.verify(token, config.authJwtSecret, (err)=>{
    if (err) {
      res.cookie('token', 'reload');
      res.cookie('isAdmin', '');
    }
    return next();
  });
});
require('./router/auth')(app);
require('./router/api')(app);
require('./router/media')(app);
require('./router/socket')(app, io);
require('./router/ssr')(app); // <--- Side Rendering

// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// catching exceptions
process.on('uncaughtException', (err) => {
  debugAppError('uncaughtException :: Fatal Error');
  debugAppError(err);
});
process.on('unhandledRejection', (err) => {
  debugAppError('unhandledRejection :: Fatal Error');
  debugAppError(err);
});

server.listen(config.port, () => {
  debugApp(`Server listening on port ${config.port} in ${config.dev ? 'development' : 'production'} mode`);
});
