import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import { singUp, setRedirect } from '../actions';
import Input from '../components/forms/Input';
// import DropDown from '../components/forms/DropDown2';
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
  // const inputCountry = useRef('');

  const updateInput = (event) => {
    if ([event.target.name][0] === 'name') {
      inputName.current.className = 'input';
      const nico = event.target.value.split(' ');
      const nicoFinal = nico.map((e)=>{
        return (e.slice(0, 1).toLocaleUpperCase() + e.slice(1).toLocaleLowerCase());
      });
      event.target.value = nicoFinal.join(' '); //.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } else if ([event.target.name][0] === 'email') {
      event.target.name = event.target.name.toLocaleLowerCase();
      inputEmail.current.className = 'input';
    } else if ([event.target.name][0] === 'password') {
      inputPassword.current.className = 'input';
    } else if ([event.target.name][0] === 'repeatPassword') {
      inputRepeatPassword.current.className = 'input';
    }
    // } else if ([event.target.name][0] === 'datalistOptions-País') {
    //   inputCountry.current.className = 'input';
    // }
    setValues({
      ...form,
      [event.target.name]: event.target.value,
      Pais: 'Chile',
    });
  };

  // const clickHandler = (ok) =>{
  //   // ok();
  // };

  // const handleSubmit = (event) => {
  const clickHandler = (ok) => {
    // event.preventDefault();
    ok('loading');
    setErrComponent('');
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
    // if (inputCountry.current.firstElementChild.value === '') {
    //   inputCountry.current.className = 'input-error';
    // } else {
    //   inputCountry.current.className = 'input-success';
    // }

    // inputCountry.current.className !== 'input-error' &
    if (inputRepeatPassword.current.className !== 'input-error' & inputName.current.className !== 'input-error' & inputEmail.current.className !== 'input-error' & inputPassword.current.className !== 'input-error') {
      delete form.repeatPassword;
      singUp(form, ()=>{
        window.scroll({ top: 0, behavior: 'smooth' });
        if (query.get('redirect')) {
          return history.push(`${query.get('redirect')}`);
        }
        return history.push('/');
      }, (err)=>{
        // console.log(err.request);

        ok('');
        // console.log(JSON.parse(err.request.response));
        document.querySelector('#react').scrollTo(0, 0);
        const req = JSON.parse(err.request.response);
        // console.log(err.request.status, req.message, req.message === 'busy account');
        switch (err.request.status) {
          case 400:
            if (req.message === 'busy account') {
              setErrComponent(<h1>Esta cuenta ya esta ocupada, por favor intenta otra.</h1>);
              window.scroll({ top: 0, behavior: 'smooth' });

              inputEmail.current.className = 'input-error';
            } else {
              setErrComponent(<h1>Rellene los parámetros correctamente.</h1>);
              window.scroll({ top: 0, behavior: 'smooth' });
            }
            break;
          default:
            setErrComponent(<h1>Lo sentimos, hubo un error interno. Inténtalo más tarde.</h1>);
            window.scroll({ top: 0, behavior: 'smooth' });
            break;
        }
      }, socket);
    } else {
      ok('');
      setErrComponent(<h1>Rellene los parámetros correctamente.</h1>);
      window.scroll({ top: 0, behavior: 'smooth' });
    }

  };

  return (
    <>
      <Layout to='/' title='Registro'>
        <form className='form noTengo'>
          {errComponent}
          <Input
            Ref={inputName}
            type='text'
            placeholder='Nombre y apellido'
            name='name'
            onChange={updateInput}
            text='Este nombre sera ocupado para identificar al usuario. También se mostrará al momento de jugar.' //  (Los caracteres no están permitidos :C [á,é,í,ó,ú,ñ] )
          />
          <Input
            Ref={inputEmail}
            type='email'
            placeholder='Email'
            name='email'
            onChange={updateInput}
            text='A traves de este medio nos comunicaremos contigo, asegurate de que sea el correcto.'
          />
          {/* <DropDown Ref={inputCountry} onChange={updateInput} text={'Selecciona tu país, esto tendrá efectos en la moneda de uso.'} placeholder='Pais'>
            <option value={''} >Seleccione una opción</option>
            <option value={'Chile'} defaultChecked>Chile</option>
            <option value={'Argentina'} >Argentina</option>
            <option value={'Paraguay'} >Paraguay</option>
            <option value={'Uruguay'} >Uruguay</option>
          </DropDown> */}
          <Input Ref={inputPassword} type='password' autoComplete='false' placeholder='Contraseña' name='password' onChange={updateInput} current-password text='Crea una contraseña de mínimo 8 caracteres.'/>
          <Input Ref={inputRepeatPassword} type='password' autoComplete='false' placeholder='Contraseña (otra vez)' name='repeatPassword' onChange={updateInput} current-password text='Repite tu contraseña. Es importante no olvidarse...'/>
          <p>
            Ya tienes cuenta ? Ingresa <Button onClick={()=>{history.push(`/sign-in${query.get('redirect') ? '?redirect=' + query.get('redirect') : ''}`);}} typebutton='text' >Aquí</Button>
          </p>
          <Button onClick={clickHandler}>Registrarme</Button>
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
