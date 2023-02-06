const axios = require('axios');
import { logoutRequest } from '../actions';
const request = async (url, method, data, dispatch, payload, opt = {}, fnCallbackError = ()=>{}) => {
  try {
    const req = await axios({
      method,
      url,
      data,
      ...opt,
    });

    return {
      err: false,
      req,
    };

  } catch ({ response: error }) {

    if (error.data === 'Unauthorized') {
      logoutRequest()(dispatch);
    }

    fnCallbackError(error);
    // dispatch(setError({ message: error.data }));
    return {
      err: true,
    };
  }
};

export default request;
