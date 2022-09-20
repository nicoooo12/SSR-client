const axios = require('axios');
import { logoutDispatchRequest, setError } from '../actions';
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
      dispatch(logoutDispatchRequest(payload));
    }

    fnCallbackError(error);
    dispatch(setError({ message: error.data }));
    return {
      err: true,
    };
  }
};

export default request;
