const axios = require('axios');
const config = require('../../../config');

const request = async (url, method, data, token, res) => {
  try {
    const req = await axios({
      method,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      url: `${config.apiUrl}${url}`,
      data,
    });

    return res.status(200).json(req.data.data);

  } catch ({ response: error }) {

    if (error.data === 'Unauthorized') {
      res.cookie('token', '', {
        httpOnly: !config.dev,
        secure: !config.dev,
      });
    }

    return res.status(error.status).json(error.data);
  }
};

// const controlResponse = (req, next) => {
//   console.log(req.status);
//   console.log(req.data);
//   return req;
// };

module.exports = request;
