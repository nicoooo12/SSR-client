const express = require('express');
const router = express.Router();

const request = require('../utils/request');

module.exports = function (app) {
  app.use('/api', router);

  router.post('/playEstado', async (req, res)=>{
    const { token } = req.cookies;
    return request(`/api/play/estado/${req.body.estado}`, 'put', null, token, res);
  });

  router.post('/cartones', async (req, res)=>{
    const { token } = req.cookies;
    return request(`/api/cartones/code/${req.body.code}`, 'get', null, token, res);
  });
  router.post('/entradas', async (req, res)=>{
    const { token } = req.cookies;
    return request(`/api/entradas/usar/${req.body.id}`, 'post', null, token, res);
  });
  router.post('/playSerie', async (req, res)=>{
    const { token } = req.cookies;
    return request(`/api/play/serie/${req.body.serie}`, 'put', null, token, res);
  });

  router.get('/code/:code', async (req, res)=>{
    const { token } = req.cookies;
    return request(`/api/code/code/${req.params.code}`, 'get', null, token, res);
  });

  router.get('/admin/orden', async (req, res)=>{
    const { token } = req.cookies;
    return request('/api/admin', 'get', null, token, res);
  });

  router.post('/admin/end-orden', async (req, res)=>{
    const { token } = req.cookies;
    const { id, pagado, comment } = req.body;
    return request(`/api/orden/end/${id}`, 'post', { pagado, comment, correo: true }, token, res);
  });

  router.post('/forgottenPassword', async (req, res)=>{
    const { email } = req.body;
    return request('/api/auth/forgottenPassword', 'post', { email }, null, res);
  });

  router.post('/resetPassword', async (req, res)=>{
    const { email, code, password } = req.body;
    return request('/api/auth/resetPassword', 'post', { email, code, password }, null, res);
  });

  // router.get('/admin/orden', async (req, res)=>{
  //   const { token } = req.cookies;
  //   return request('/api/orden', 'get', null, token, res);
  // });

  router.post('/code/:code', async (req, res)=>{
    const { token } = req.cookies;
    return request(`/api/code/canjear/${req.params.code}`, 'post', null, token, res);
  });

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
