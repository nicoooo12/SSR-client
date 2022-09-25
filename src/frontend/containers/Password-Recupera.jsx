import React from 'react';
import Layout from '../components/layouts/Layout';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { resetPassword } from '../actions';
import Alert from '../utils/Alert';

const Password = ({ resetPassword, history }) => {
  const { email, code } = useParams();
  const inputPassword = React.createRef(inputPassword);
  const inputRepeatPassword = React.createRef(inputRepeatPassword);

  const clickHandler = () => {
    inputPassword.current.className = 'input';
    inputRepeatPassword.current.className = 'input';
    if (!/[a-zA-Z0-9(!¡¿?#$%&")]{8,}/g.test(inputPassword.current.children[0].value)) {
      inputPassword.current.className = 'input-error';
      return false;
    }
    if (inputPassword.current.children[0].value !== inputRepeatPassword.current.children[0].value) {
      inputRepeatPassword.current.className = 'input-error';
      return false;
    }
    resetPassword(
      email,
      code,
      inputPassword.current.children[0].value,
      () => {
        Alert('Contraseña restaurada');
        history.push('/sign-in');
      },
      () => {
        Alert('algo salió mal...');
      },
    );
  };

  return (
    <>
      <Layout to='/sign-in' title=' '>
        <div className='noTengo'>
          <h1>Recuperar Contraseña</h1>
          {/* <p>Introduce tu email para obtener tu código de verificación</p> */}
          <Input Ref={inputPassword} type='password' autoComplete='false' placeholder='Contraseña' name='password' current-password text='Crea una contraseña de mínimo 8 caracteres.'/>
          <Input Ref={inputRepeatPassword} type='password' autoComplete='false' placeholder='Contraseña (otra vez)' name='repeatPassword' current-password text='Repite tu contraseña. Es importante no olvidarse...'/>
          <Button onClick={clickHandler} autoLogin={false} >restaurar</Button>
        </div>
      </Layout>
    </>
  );
};

const mapDispatchToProps = {
  resetPassword,
};

export default connect(null, mapDispatchToProps)(Password);
