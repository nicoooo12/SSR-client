const express = require('express');
const debugApp = require('debug')('app:router/media');

const sharp = require('sharp');
const path = require('path');

module.exports = function (app) {
  const router = new express.Router();
  app.use('/media', router);

  router.get('/img/:filename',
    // passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { filename } = req.params;
        let {
          w, h, q, s,
        } = req.query;

        const { fit, bg } = req.query;

        if (s) {
          s = +s;
          if (s > 10000) {
            return res.status(400).json({
              message: 'Invalid size parameter. size must be <=10000',
            });
          }
        }

        if (w) {
          w = +w;
          if (w > 10000) {
            return res.status(400).json({
              message: 'Invalid width parameter. width must be <=10000',
            });
          }
        }

        if (h) {
          h = +h;
          if (h > 10000) {
            return res.status(400).json({
              message: 'Invalid height parameter. height must be <=10000',
            });
          }
        }

        if (q) {
          q = +q;
          if (q > 100) {
            return res.status(400).json({
              message: 'Invalid quality parameter. quality must be <=100',
            });
          }
        }

        res.setHeader('content-type', 'image/jpg');
        const image = sharp(path.join(__dirname, '..', '..', 'frontend', 'assets', 'images', filename)).toFormat('jpeg', {
          quality: q || 60,
        });

        let width = null;
        let height = null;

        if (h && !w) {
          width = (await image.metadata()).width;
        } else if (w) {
          width = +w;
        }

        if (w && !h) {
          height = (await image.metadata()).height;
        } else if (h) {
          height = +h;
        }

        return res.send(
          await image
            .resize(
              s || (width),
              s || (height),
              { fit, background: bg ? `#${bg}` : null },
            )
            .withMetadata()
            .toBuffer(),
        );
      } catch (error) {
        debugApp(error);
        res.setHeader('content-type', 'application/json');
        return res
          .status(500)
          .json({ message: 'Internal server error', status: 500, success: false });
      }
    });

};
