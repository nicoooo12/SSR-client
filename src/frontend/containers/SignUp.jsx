import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import { singUp, setRedirect } from '../actions';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import Layout from '../components/layouts/Layout';

import '../assets/styles/containers/signIn-up.scss';
import { useLocation } from 'react-router-dom';

const App = ({ singUp, history, redirect, setRedirect, socket })=> {
  const query = new URLSearchParams(useLocation().search);

  const [form, setValues] = useState({
    email: '',
    name: '',
    password: '',
  });

  const [errComponent, setErrComponent] = useState(<></>);

  const inputName = useRef('');
  const inputEmail = useRef('');
  const inputPassword = useRef('');
  const inputRepeatPassword = useRef('');

  const updateInput = (event) => {
    if ([event.target.name][0] === 'name') {
      inputName.current.className = 'input';
      const nico = event.target.value.split(' ');
      const nicoFinal = nico.map((e)=>{
        return e.slice(0, 1).toLocaleUpperCase() + e.slice(1).toLocaleLowerCase();
      });
      event.target.value = nicoFinal.join(' ');
    } else if ([event.target.name][0] === 'email') {
      event.target.name = event.target.name.toLocaleLowerCase();
      inputEmail.current.className = 'input';
    } else if ([event.target.name][0] === 'password') {
      inputPassword.current.className = 'input';
    } else if ([event.target.name][0] === 'repeatPassword') {
      inputRepeatPassword.current.className = 'input';
    }
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const clickHandler = (ok) =>{
    ok();
  };

  const handleSubmit = (event) => {
    setErrComponent('');
    event.preventDefault();
    if (!/[a-zA-Z]/g.test(form.name)) {
      inputName.current.className = 'input-error';
    } else {
      inputName.current.className = 'input-success';
    }
    // eslint-disable-next-line no-useless-escape
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(form.email)) {
      inputEmail.current.className = 'input-error';
    } else {
      inputEmail.current.className = 'input-success';
    }
    if (!/[a-zA-Z0-9(!¡¿?#$%&")]{8,}/g.test(form.password)) {
      inputPassword.current.className = 'input-error';
    } else {
      inputPassword.current.className = 'input-success';
    }
    if (inputRepeatPassword.current.firstElementChild.value === '' || inputRepeatPassword.current.firstElementChild.value !== (form.password)) {
      inputRepeatPassword.current.className = 'input-error';
    } else {
      inputRepeatPassword.current.className = 'input-success';
    }

    if (inputRepeatPassword.current.className !== 'input-error' & inputName.current.className !== 'input-error' & inputEmail.current.className !== 'input-error' & inputPassword.current.className !== 'input-error') {
      delete form.repeatPassword;
      singUp(form, ()=>{
        if (query.get('redirect')) {
          history.push(`${query.get('redirect')}`);
        } else {
          history.push('/');
        }
      }, (err)=>{
        // console.log(err.request);
        // console.log(JSON.parse(err.request.response));
        document.querySelector('#react').scrollTo(0, 0);
        const req = JSON.parse(err.request.response);
        // console.log(err.request.status, req.message, req.message === 'busy account');
        switch (err.request.status) {
          case 400:
            if (req.message === 'busy account') {
              setErrComponent(<h1>Esta cuenta ya esta ocupada, por favor intenta otra.</h1>);
              inputEmail.current.className = 'input-error';
            } else {
              setErrComponent(<h1>Rellene los parámetros correctamente.</h1>);
            }
            break;
          default:
            setErrComponent(<h1>Lo sentimos, hubo un error interno. Intentalo más tarde.</h1>);
            break;
        }
      }, socket);
    } else {
      setErrComponent(<h1>Rellene los parámetros correctamente.</h1>);
    }

  };

  return (
    <>
      <Layout to='/' title='Registro'>
        <form onSubmit={handleSubmit} className='form noTengo'>
          {errComponent}
          <Input Ref={inputName} type='text' placeholder='Nombre y apellido' name='name' onChange={updateInput} text='Este nombre sera ocupado para identificar al usuario. También se mostrará al momento de jugar.' />
          <Input Ref={inputEmail} type='email' placeholder='Email' name='email' onChange={updateInput} text='A traves de este medio nos comunicaremos contigo, asegurate de que sea el correcto.' />
          <Input Ref={inputPassword} type='password' autoComplete='false' placeholder='Contraseña' name='password' onChange={updateInput} current-password text='Crea una contraseña de mínimo 8 caracteres.'/>
          <Input Ref={inputRepeatPassword} type='password' autoComplete='false' placeholder='Contraseña (otra vez)' name='repeatPassword' onChange={updateInput} current-password text='Repite tu contraseña. Es importante no olvidarse...'/>
          <p>
            Ya tienes cuenta ? Ingresa <Button onClick={()=>{history.push(`/sign-in${query.get('redirect') ? '?redirect=' + query.get('redirect') : ''}`);}} typebutton='text' >Aquí</Button>
          </p>
          <Button type='submit' onClick={clickHandler}>Registrarme</Button>
        </form>
      </Layout>
    </>
  );

};

const mapSateToProps = (state)=>{
  return {
    redirect: state.redirect,
  };
};

const mapDispatchToProps = {
  singUp,
  setRedirect,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
