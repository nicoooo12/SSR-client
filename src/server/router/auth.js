const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const axios = require('axios');

const config = require('../../../config');

require('../utils/auth/strategies/basic');

module.exports = function (app) {
  const router = express.Router();
  app.use('/auth', router);

  router.post('/sign-in', async function (req, res, next) {
    passport.authenticate('basic', function (error, data) {
      try {
        if (error || !data) {
          console.log(error);
          return next(boom.unauthorized());
        }
        return req.login(data, { session: false }, async function (error) {
          if (error) {
            return next(error);
          }

          const { token, ...user } = data;
          res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
          });

          return res.json(user).status(200);
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });

  router.get('/logout', (req, res, next) => {
    res.cookie('token', '', {
      httpOnly: true,
      secure: true,
      path: '/',
    });

    res.json({
      message: 'ok',
    }).status(200);
  });

  router.post('/sign-up', async function (req, res, next) {
    const { body: user } = req;

    try {
      await axios({
        url: `${config.apiUrl}/api/auth/sign-up`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: user,
      });

      res.json({ message: 'user created' }).status(201);
    } catch (error) {
      if (error.response.status === 400) {
        next(boom.badRequest(error.response.data.message));
      }
      next(error);
    }
  });

};
