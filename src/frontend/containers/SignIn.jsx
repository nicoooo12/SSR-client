import React, { useState } from 'react';
import { connect } from 'react-redux';

import { singIn, setRedirect } from '../actions';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import Layout from '../components/layouts/Layout';

import { Link } from 'react-router-dom';

import '../assets/styles/containers/signIn-up.scss';
import { useLocation } from 'react-router-dom';

const App = ({ singIn, history, redirect, setRedirect, socket })=> {
  const query = new URLSearchParams(useLocation().search);

  const email = React.createRef(email);
  const password = React.createRef(password);

  const [form, setValues] = useState({
    email: '',
    name: '',
  });

  const [errComponent, setErrComponent] = useState(<></>);

  const updateInput = (event) => {
    if (event.target.name === 'email') {
      email.current.className = 'input';
    }
    if (event.target.name === 'password') {
      password.current.className = 'input';
    }
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  // console.log(history);
  const clickHandler = (ok) =>{
    ok();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.current.children[0].value || !password.current.children[0].value) {
      if (!email.current.children[0].value) {
        email.current.className = 'input-error';
      }
      if (!password.current.children[0].value) {
        password.current.className = 'input-error';
      }
      setErrComponent(<h1>Por favor, rellena todos los campos</h1>);
      return 'nop';
    }
    setErrComponent('');
    return singIn(form, (user)=>{
      console.log(query.get('redirect'));
      if (query.get('redirect')) {
        history.push(`${query.get('redirect')}`);
      } else {
        history.push('/');
      }
    }, (err)=>{
      document.querySelector('#react').scrollTo(0, 0);
      // console.log(err.request.status);
      switch (err.request?.status) {
        case 401:
          setErrComponent(<h1>Usuario y/o contraseña incorrecto</h1>);
          break;
        default:
          setErrComponent(<h1>Lo sentimos, hubo un error interno. Inténtalo más tarde.</h1>);
          break;
      }
    }, socket);
  };

  return (
    <>
      <Layout to='/' title='Ingresar'>
        <form onSubmit={handleSubmit} className='form noTengo'>
          {errComponent}
          <Input Ref={email} type='text' placeholder='Email' name='email' onChange={updateInput}/>
          <Input Ref={password} type='password' autoComplete='false' placeholder='Contraseña' name='password' onChange={updateInput} current-password />
          <p>
            <Link to='/password'>
              Olvide mi contraseña
            </Link>
          </p>
          <br />
          <p>
            No tienes cuenta ? Crear una <Button onClick={()=>{history.push(`/sign-up${query.get('redirect') ? '?redirect=' + query.get('redirect') : ''}`);}} typebutton='text' >Aquí</Button>
          </p>
          <Button type='submit' onClick={clickHandler} >Iniciar sesión</Button>
        </form>
        <br/>
      </Layout>
    </>
  );

};

const mapSateToProps = (state)=>{
  return {
    redirect: state,
  };
};

const mapDispatchToProps = {
  singIn,
  setRedirect,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
