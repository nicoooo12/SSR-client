import request from '../utils/request';
const axios = require('axios');

export const addItemToCarrito = (payload) =>({
  type: 'ADD_ITEM_TO_CARRITO',
  payload,
});

export const addReferidoToCarrito = (payload) =>({
  type: 'ADD_REFERIDO_TO_CARRITO',
  payload,
});

export const removeItemToCarrito = (payload) => ({
  type: 'REMOVE_ITEM_TO_CARRITO',
  payload,
});

export const activeCarrito = (payload) => ({
  type: 'ACTIVE_CARRITO',
  payload,
});

export const desactiveCarrito = (payload) => ({
  type: 'DESACTIVE_CARRITO',
  payload,
});

export const statusNextCarrito = (payload) => ({
  type: 'STATUS_NEXT_CARRITO',
  payload,
});

export const setStatusCarrito = (payload) => ({
  type: 'SET_STATUS_CARRITO',
  payload,
});

export const resetStatusCarrito = (payload) => ({
  type: 'RESET_CARRITO',
  payload,
});

export const loginRequest = (payload) => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutDispatchRequest = (payload) => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const logoutRequest = (payload) => {
  console.log('logout');
  return async (dispatch) => {
    try {
      const l = await axios({
        method: 'get',
        url: '/auth/logout',
      });
      console.log('logout');
      document.cookie = 'email=; path=/; max-age=0';
      document.cookie = 'name=; path=/; max-age=0';
      document.cookie = 'id=; path=/; max-age=0';
      // document.cookie = 'token=; path=/; max-age=0';

      console.log('[??]', l);
      dispatch(logoutDispatchRequest(payload));
      // document.location.href = '/';

    } catch (error) {
      console.log('[err]', error);
      // document.location.href = '/';
    }
  };
};

export const registerRequest = (payload) => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const setRedirect = (payload) => ({
  type: 'SET_REDIRECT',
  payload,
});

export const changeColorPlay = (payload) => ({
  type: 'SET_REDIRECT',
  payload,
});

export const updateStateReducer = (payload) => ({
  type: 'UPDATE_STATE',
  payload,
});

export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
});

export const singUp = (payload, fnCallBack, fnErrorCallback, socket) => {
  return async (dispatch) => {
    const req = await request('/auth/sign-up', 'post', payload, dispatch, payload, {}, fnErrorCallback, socket);
    if (!req.err) {
      dispatch(singIn({ email: payload.email, password: payload.password }, fnCallBack, fnErrorCallback, socket));
    }
  };
};

export const singIn = ({ email, password }, fnCallback, fnErrorCallback, socket) => {
  return async (dispatch) => {
    const req = await request('/auth/sign-in', 'post', null, dispatch, null, { auth: {
      username: email,
      password,
    } }, fnErrorCallback);
    if (!req.err) {
      console.log(req.req);
      const { data } = req.req;
      document.cookie = `email=${data.user.email}; path=/;`;
      document.cookie = `name=${data.user.name}; path=/;`;
      document.cookie = `id=${data.user.id}; path=/;`;
      // socket?.removeAllListeners();
      console.log('socket: ', data.user.id ? data.user.id : 'change-noSignIn');
      socket.on(data.user.id, ()=>{
        updateState();
        socket.emit('ok');
      });
      // console.log('[user]: ' + data.user);
      dispatch(registerRequest(data.user));
      dispatch(initialState());
      fnCallback(data.user);
    }
  };
};

export const createOrden = (compra, referido, totalPago) => {
  return async (dispatch) => {
    const req = await request('/api/createOrden', 'post', {
      'compra': compra,
      'totalPago': totalPago,
      'referido': referido,
      'tipoDePago': 'transferencia',
    }, dispatch, null);
    if (!req.err) {
      dispatch(resetStatusCarrito());
      dispatch(updateState());
    }
  };
};

export const cancelarMiOrden = () => {
  return async (dispatch) => {
    const req = await request('/api/cancelOrden', 'post', null, dispatch, null);
    if (!req.err) {
      dispatch(updateState());
    }
  };
};

export const initialState = () => {
  return async (dispatch) => {
    const req = await request('/api/initialState', 'post', null, dispatch, null);
    if (!req.err) {
      const { data } = req.req;
      console.log(data);
      dispatch(updateStateReducer({ ...data, load: true }));
    }
  };
};

export const updateState = () => {
  return async (dispatch) => {
    const req = await request('/api/getState', 'post', null, dispatch, null);
    if (!req.err) {
      const { data } = req.req;
      console.log(data);
      dispatch(updateStateReducer(data));
    }
  };
};

export const getCode = (code, fnCallback, fnErrorCallback) => {
  return async (dispatch) => {
    const req = await request(`/api/code/${code}`, 'get', null, dispatch, null, {}, fnErrorCallback);
    if (!req.err) {
      const { data } = req.req;
      dispatch(updateState());
      fnCallback(data);
    }
  };
};

export const canjearCode = (code, fnCallback, fnErrorCallback) => {
  return async (dispatch) => {
    console.log('canjeando');
    const req = await request(`/api/code/${code}`, 'post', null, dispatch, null, {}, fnErrorCallback);
    if (!req.err) {
      const { data } = req.req;
      dispatch(updateState());
      fnCallback(data);
    }
  };
};

export const getAdminVars = (fnCallback, fnErrorCallback) => {
  return async (dispatch) => {
    const req = await request('/api/admin/orden', 'get', null, dispatch, null, {}, fnErrorCallback);
    if (!req.err) {
      const { data } = req.req;
      // dispatch(updateState());
      fnCallback(data);
    }
  };
};

export const terminarOrden = (id, pagado, comment, fnCallback, fnErrorCallback) => {
  return async (dispatch) => {
    pagado = +pagado;
    const req = await request('/api/admin/end-orden', 'post', { id, pagado, comment, correo: true }, dispatch, null, {}, fnErrorCallback);
    if (!req.err) {
      const { data } = req.req;
      // dispatch(updateState());
      fnCallback(data);
    }
  };
};

export const forgottenPassword = (email, fnCallback, fnErrorCallback) => {
  return async (dispatch) => {
    const req = await request('/api/forgottenPassword', 'post', { email }, dispatch, null, {}, fnErrorCallback);
    if (!req.err) {
      const { data } = req.req;
      // dispatch(updateState());
      fnCallback(data);
    }
  };
};

export const resetPassword = (email, code, password, fnCallback, fnErrorCallback) => {
  return async (dispatch) => {
    const req = await request('/api/resetPassword', 'post', { email, code, password }, dispatch, null, {}, fnErrorCallback);
    if (!req.err) {
      const { data } = req.req;
      // dispatch(updateState());
      fnCallback(data);
    }
  };
};

export const changeEstadoPLay = (estado, fnCallback, fnErrorCallback) => {
  return async (dispatch) => {
    const req = await request('/api/playEstado', 'post', { estado }, dispatch, null, {}, fnErrorCallback);
    if (!req.err) {
      const { data } = req.req;
      dispatch(updateState());
      fnCallback(data);
    }
  };
};

export const changeSeriePlay = (serie, fnCallback, fnErrorCallback) => {
  return async (dispatch) => {
    const req = await request('/api/playSerie', 'post', { serie }, dispatch, null, {}, fnErrorCallback);
    if (!req.err) {
      const { data } = req.req;
      dispatch(updateState());
      fnCallback(data);
    }
  };
};

export const cartones = (code, fnCallback, fnErrorCallback) => {
  return async (dispatch) => {
    const req = await request('/api/cartones', 'post', { code }, dispatch, null, {}, fnErrorCallback);
    if (!req.err) {
      const { data } = req.req;
      dispatch(updateState());
      fnCallback(data);
    }
  };
};

export const entradas = (id, fnCallback, fnErrorCallback) => {
  return async (dispatch) => {
    const req = await request('/api/entradas', 'post', { id }, dispatch, null, {}, fnErrorCallback);
    if (!req.err) {
      const { data } = req.req;
      dispatch(updateState());
      fnCallback(data);
    }
  };
};
