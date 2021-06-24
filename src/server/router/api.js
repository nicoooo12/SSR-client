const express = require('express');
const router = express.Router();
const axios = require('axios');
const boom = require('@hapi/boom');
const config = require('../../../config');

module.exports = function (app) {
  app.use('/api', router);

  router.post('/getState', async (req, res)=>{
    const { token, email, name, id } = req.cookies;

    let cartones;
    try {
      const { data: dataCartones } = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.apiUrl}/api/cartones/mys`,
      });
      cartones = dataCartones.data;
    } catch (error) {
      // console.log(error);
      cartones = {};
    }

    let user;
    try {
      await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.apiUrl}/api/auth/isauth`,
      });

      user = {
        name,
        email,
        id,
      };
    } catch (error) {
      // console.log(error);
      user = {};
    }

    let myEndsOrden;
    try {
      const { data: dataOrden } = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.apiUrl}/api/orden/terminadas/my`,
      });
      myEndsOrden = dataOrden.data;
    } catch (error) {
      // console.log(error);
      myEndsOrden = [];
    }
    let myInProgressOrden;
    try {
      const { data: dataOrden } = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.apiUrl}/api/orden/my`,
      });
      myInProgressOrden = dataOrden.data[0] ? dataOrden.data[0] : {};
    } catch (error) {
      // console.log(error);
      myInProgressOrden = {};
    }

    const newState = {
      'user': user,
      'cartonesUser': cartones[0] ? cartones.map((e)=>{
        return {
          ...e,
          play: [[false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false]],
        };
      }) : [],
      'ordenes': {
        enProgreso: myInProgressOrden,
        terminadas: myEndsOrden,
      },
      'play': {
        estado: 0,
        serieJuego: 1,
      },
    };

    res.json({
      data: newState,
    }).status(200);

  });

  router.post('/initialState', async (req, res)=>{
    const { token } = req.cookies;

    if (token) {
      const { data: initialState } = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.apiUrl}/api/initialState`,
      });
      res.json(initialState.data).status(200);
    } else {
      const { data: initialState } = await axios({
        method: 'get',
        url: `${config.apiUrl}/api/initialState`,
      });
      res.json(initialState.data).status(200);
    }

  });
  router.post('/createOrden', async (req, res, next)=>{
    const { token } = req.cookies;
    try {
      const { data: dataOrden } = await axios({
        method: 'post',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.apiUrl}/api/orden/my`,
        data: req.body,
      });

      res.json({
        data: dataOrden,
      }).status(200);

    } catch (error) {
      // console.log(error.request.data);
      next(error);
    }
  });

  app.use(express.raw({ type: 'application/octet-stream' }));
  router.post('/createCanvas', async (req, res, next)=>{
    const { token } = req.cookies;
    try {
      const { data: dataOrden } = await axios({
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: `${config.apiUrl}/api/images/upload`,
        data: { image: req.body.image },
      });

      res.json({
        data: dataOrden,
      }).status(200);

    } catch (error) {
      // console.log(error.request.data);
      next(error);
    }
  });

  const withErrorStack = (error, stack)=>{
    if (config.dev) {
      return { ...error, stack };
    }
    return error;
  };

  router.use(
    function logErrors(err, req, res, next) {
      console.log(err);
      next(err);
    },
    function wrapErrors(err, req, res, next) {
      if (!err.isBoom) {
        next(boom.badImplementation(err));
      }
      next(err);
    },
    function errorHandler(err, req, res, next) {
      const {
        output: { statusCode, payload },
      } = err;
      res.status(statusCode);
      res.json(withErrorStack(payload, err.stack));
    },
  );

};
