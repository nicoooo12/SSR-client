const express = require('express');
const router = express.Router();

const request = require('../utils/request');

module.exports = function (app) {
  app.use('/api', router);

  router.post('/getState', async (req, res)=>{
    const { token } = req.cookies;
    if (token) {
      return request('/api/getState', 'get', null, token, res);
    }
    return request('/api/getState', 'get', null, undefined, res);
  });

  router.post('/initialState', async (req, res, next)=>{
    const { token } = req.cookies;
    if (token) {
      return await request('/api/initialState', 'get', null, token, res);
    }
    return await request('/api/initialState', 'get', null, undefined, res);
  });

  router.post('/createOrden', async (req, res, next)=>{
    const { token } = req.cookies;
    return request('/api/orden/my', 'post', req.body, token, res);
  });

  router.post('/cancelOrden', async (req, res, next) =>{
    const { token } = req.cookies;
    return request('/api/orden/my', 'delete', null, token, res);
  });

};
