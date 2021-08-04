const express = require('express');
const router = express.Router();
const axios = require('axios');
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
      res.json({
        data: getState.data,
      }).status(200);
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

  router.post('/cancelOrden', async (req, res, next) =>{
    const { token } = req.cookies;
    try {
      const { data: dataOrden } = await axios({
        method: 'delete',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.apiUrl}/api/orden/my`,
      });

      res.json({
        data: dataOrden,
      }).status(200);

    } catch (error) {
      // console.log(error.request.data);
      next(error);
    }
  });

};
