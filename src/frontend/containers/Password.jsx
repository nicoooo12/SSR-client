import React from 'react';
import Layout from '../components/layouts/Layout';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import { connect } from 'react-redux';

import { forgottenPassword } from '../actions';
import Alert, { success } from '../utils/Alert';

const Password = ({ forgottenPassword, history }) => {
  const email = React.createRef(email);

  const clickHandler = () => {
    forgottenPassword(
      email.current.children[0].value,
      (res) => {
        success('email enviado');
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
          <p>Introduce tu email para obtener tu código de verificación</p>
          <Input Ref={email} type='text' placeholder='Email' name='email' />
          <Button onClick={clickHandler} autoLogin={false} >Enviar código</Button>
        </div>
      </Layout>
    </>
  );
};

const mapDispatchToProps = {
  forgottenPassword,
};

export default connect(null, mapDispatchToProps)(Password);
