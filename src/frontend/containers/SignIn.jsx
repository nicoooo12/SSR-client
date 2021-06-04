import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { singIn, setRedirect } from '../actions';
import Header from '../components/Header-B';
import Title from '../components/Title';
// import Content from '../components/Content';
// import Section from '../components/Section';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
// import MainContent from '../components/MainContent';
// import Footer from '../components/Footer';

import '../assets/styles/containers/signIn-up.scss';

const App = ({ singIn, history, redirect, setRedirect, notRedirect, socket })=> {
  const [first, setFirst] = useState(true);
  useEffect(()=>{
    if (first) {
      setFirst(false);
      document.querySelector('#react').scrollTo(0, 0);
    }
  }, []);

  // console.log(redirect);

  const [form, setValues] = useState({
    email: '',
    name: '',
  });

  const [errComponent, setErrComponent] = useState(<></>);

  const updateInput = (event) => {
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
    setErrComponent('');
    event.preventDefault();
    singIn(form, (user)=>{
      socket.emit('holaMundo', user.id);
      if (!notRedirect) {
        if (redirect) {
          history.push(redirect);
        } else {
          history.push('/');
        }
      }
    }, (err)=>{
      document.querySelector('#react').scrollTo(0, 0);
      // console.log(err.request.status);
      switch (err.request.status) {
        case 401:
          setErrComponent(<h1>Usuario y/o contraseña incorrecto</h1>);
          break;
        default:
          setErrComponent(<h1>Lo sentimos, hubo un error interno. Intentalo más tarde.</h1>);
          break;
      }
    });
  };

  return (
    <>
      <Header/>
      <Title title='Ingresar' />
      <form onSubmit={handleSubmit} className='form'>
        {errComponent}
        <Input type='text' placeholder='Email' name='email' onChange={updateInput}/>
        <Input type='password' autoComplete='false' placeholder='Contraseña' name='password' onChange={updateInput} current-password />
        <p>
          No tienes cuenta ? Crear una <Button onClick={()=>{history.push('/sign-up');}} typebutton='text' >Aquí</Button>
        </p>
        <Button type='submit' onClick={clickHandler} >Iniciar sesión</Button>
      </form>
      <br/>
      {/* <Footer/> */}
    </>
  );

};

const mapSateToProps = (state)=>{
  return {
    redirect: state.redirect,
  };
};

const mapDispatchToProps = {
  singIn,
  setRedirect,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
