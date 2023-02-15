const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../../config');

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
    try {

      const { token } = req.cookies;

      if (token) {
        const { data: initialStateServer } = await axios({
          method: 'get',
          headers: token ? { Authorization: `Bearer ${token}` } : { },
          url: `${config.apiUrl}/api/initialState`,
        });

        // if (initialStateServer.data.vars.internacional) {
        //   // console.log(initialStateServer.data.user, initialStateServer.data.vars);
        //   initialStateServer.data.user = { ...initialStateServer.data.user };
        //   const nacion = initialStateServer.data.vars.naciones.findIndex((e)=>e.name === initialStateServer.data.user.pais);
        //   // console.log(initialStateServer.data.vars.naciones[nacion]);
        //   initialStateServer.data.vars = {
        //     ...initialStateServer.data.vars,
        //     pago: initialStateServer.data.vars.naciones[nacion].pago,
        //     moneda: initialStateServer.data.vars.naciones[nacion].moneda,
        //     simbolo: initialStateServer.data.vars.naciones[nacion].simbolo,
        //     cambio: initialStateServer.data.vars.naciones[nacion].cambio,
        //   };
        // }

        const initialState = {
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
            // api: config.apiUrl,
            ...initialStateServer.data.vars,
          },
          'load': true,
        };

        res.status(200).json(initialState);
      } else {
        res.status(200).json({});
      }
    } catch (error) {
      next(error);
    }
    // return await request('/api/initialState', 'get', null, undefined, res);
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
