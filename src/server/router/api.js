const express = require('express');
const router = express.Router();
const axios = require('axios');
const boom = require('@hapi/boom');
const config = require('../../../config');

module.exports = function (app) {
  app.use('/api', router);

  router.post('/getState', async (req, res)=>{

    const { token } = req.cookies;

    if (token) {
      const { data: getState } = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.apiUrl}/api/getState`,
      });
      res.json(getState.data).status(200);
    } else {
      const { data: getState } = await axios({
        method: 'get',
        url: `${config.apiUrl}/api/getState`,
      });
      res.json({
        data: getState.data,
      }).status(200);
    }

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
