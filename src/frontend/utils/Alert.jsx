// import React from 'react';
// import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import withReactContent from 'sweetalert2-react-content';
// import * as htmlparser2 from 'htmlparser2';
// const mySwal = withReactContent(Swal);

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

// export const show = (title, content) => {
//   ReactDOM.render(document.getElementById('modals'), <h1>test</h1>);
//   return Swal.fire({
//     title,
//     html: '<div id="model"></div>',
//   });
// };

export default Alert;
