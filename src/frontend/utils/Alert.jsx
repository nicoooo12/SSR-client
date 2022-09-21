// import React from 'react';
import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

const alert = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  // timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
  customClass: {
    container: 'alert',
  },
});

const Alert = (title) => {
  return alert.fire({
    title,
  });
};

export const success = (title) => {
  return Swal.fire({
    icon: 'success',
    title,
  });
};

export const error = (title) => {
  return Swal.fire({
    icon: 'error',
    title,
  });
};

export default Alert;
