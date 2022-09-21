import React from 'react';

import Layout from '../components/layouts/Layout';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';

const Ayuda = ({ history }) => {
  const code = React.createRef(code);
  const clickHandler = () => {
    history.push(`/canjear/${code.current.children[0].value}`);
  };

  return (
    <>
      <Layout title='Canjear' to='/' >
        <div className='noTengo'>
          <p>Canjea tu código</p>
          <Input Ref={code} type='text' placeholder='Código' name='code'/>
          <Button onClick={clickHandler}>Canjear</Button>
        </div>
      </Layout>
    </>
  );
};

export default Ayuda;
