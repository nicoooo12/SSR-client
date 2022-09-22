import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/layouts/Layout';
import { useParams } from 'react-router-dom';
// import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import { getCode, canjearCode } from '../actions';
import { useEffect } from 'react';
import { useState } from 'react';
import Alert from '../utils/Alert';

const Canje = ({ getCode, history, canjearCode }) => {
  const { code } = useParams();

  const [dataCode, setDataCode] = useState(false);
  useEffect(()=>{
    getCode(code, (e)=>{
      console.log(e);
      if (!e.getCode[0]) {
        return setDataCode({ active: 'nop' });
      }
      return setDataCode(e.getCode[0]);
    }, (e)=>{
      console.log(e);
    });
  }, []);

  const clickHandler = () => {
    console.log('hola?');
    canjearCode(code, ()=> {
      Alert('canjeado correctamente');
      history.push('/cartones');
    }, ()=>{
      Alert('ups! ocurrió un error :(');
    });
  };

  return (
    <>
      <Layout title='Canjear' to='/catalogo' >
        <div className='noTengo'>
          <p>Canjea tu código: <b>{code}</b></p>
          <p style={{ color: dataCode ? dataCode?.active === '' ? '#008A00' : '#CA024F' : 'black' }}>{dataCode ? dataCode?.active === '' ? 'Habilitado' : 'No Habilitado' : '...'}</p>
          <div>{dataCode?.active === '' ? <Button onClick={clickHandler}>Canjear</Button> : <></>}</div>
        </div>
      </Layout>
    </>
  );
};

const mapDispatchToProps = {
  getCode,
  canjearCode,
};

export default connect(null, mapDispatchToProps)(Canje);
