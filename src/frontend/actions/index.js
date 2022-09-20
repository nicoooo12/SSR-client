import request from '../utils/request';

export const addItemToCarrito = (payload) =>({
  type: 'ADD_ITEM_TO_CARRITO',
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
  return async (dispatch) => {
    const req = await request('/auth/logout', 'get', null, dispatch, payload);
    if (!req.err) {
      dispatch(logoutDispatchRequest(payload));
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

export const singUp = (payload, fnCallBack, fnErrorCallback) => {
  return async (dispatch) => {
    const req = await request('/auth/sign-up', 'post', payload, dispatch, payload, {}, fnErrorCallback);
    if (!req.err) {
      dispatch(singIn({ email: payload.email, password: payload.password }, fnCallBack, fnErrorCallback));
    }
  };
};

export const singIn = ({ email, password }, fnCallback, fnErrorCallback) => {
  return async (dispatch) => {
    const req = await request('/auth/sign-in', 'post', null, dispatch, null, { auth: {
      username: email,
      password,
    } }, fnErrorCallback);
    if (!req.err) {
      const { data } = req.req;
      document.cookie = `email=${data.user.email}`;
      document.cookie = `name=${data.user.name}`;
      document.cookie = `id=${data.user.id}`;
      dispatch(registerRequest(data.user));
      dispatch(initialState());
      fnCallback(data.user);
    }
  };
};

export const createOrden = (compra, totalPago) => {
  return async (dispatch) => {
    const req = await request('/api/createOrden', 'post', {
      'compra': compra,
      'totalPago': totalPago,
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
      dispatch(updateStateReducer({ ...data, load: true }));
    }
  };
};

export const updateState = () => {
  return async (dispatch) => {
    const req = await request('/api/getState', 'post', null, dispatch, null);
    if (!req.err) {
      const { data } = req.req;
      dispatch(updateStateReducer(data));
    }
  };
};
