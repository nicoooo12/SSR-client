import axios from 'axios';
// import { io } from 'socket.io-client';

// const socket = io();

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
  return (dispatch) => {
    axios.get('/auth/logout')// {email, name, password}
      .then(() => {
        dispatch(logoutDispatchRequest(payload));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
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
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)// {email, name, password}
      .then(({ data }) => {
        dispatch(singIn({ email: payload.email, password: payload.password },
          ()=>{
            fnCallBack();
          },
          (err)=>{
            fnErrorCallback(err);
          }));
      })
      .catch((error) => {
        fnErrorCallback(error);
        dispatch(setError(error));
      });
  };
};

export const singIn = ({ email, password }, fnCallback, fnErrorCallback) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })// {email, password}
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(registerRequest(data.user));
        dispatch(initialState());
        fnCallback(data.user);
      })
      .catch((error) => {
        fnErrorCallback(error);
        dispatch(setError(error));
      });
  };
};

export const createOrden = (compra, totalPago) => {
  return (dispatch) => {
    axios({
      url: '/api/createOrden',
      method: 'post',
      data: {
        'compra': compra,
        // [{
        //   'serie': 1,
        //   'cantidad': 1,
        // }],
        'totalPago': totalPago,
        'tipoDePago': 'transferencia',
      },
    })// {email, password}
      .then(({ data }) => {
        dispatch(resetStatusCarrito());
        dispatch(updateState());
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const cancelarMiOrden = () => {
  return (dispatch) => {
    axios({
      url: '/api/cancelOrden',
      method: 'post',
    })
      .then(() => {
        dispatch(updateState());
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const initialState = () => {
  return (dispatch) => {
    axios({
      url: '/api/initialState',
      method: 'post',
    })
      .then(({ data }) => {
        dispatch(updateStateReducer({ ...data, load: true }));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const updateState = () => {
  return (dispatch) => {
    axios({
      url: '/api/getState',
      method: 'post',
    })// {email, password}
      .then(({ data }) => {
        // dispatch(registerRequest(data.user));
        dispatch(updateStateReducer(data.data));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};
