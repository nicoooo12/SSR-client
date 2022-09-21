import React from 'react';
import Icon from '../display/Icon';
import '../../assets/styles/components/forms/Input.scss';
import Alert from '../../utils/Alert';

const App = ({ children, placeholder, text = '' })=> {

  const Input = React.createRef(Input);

  const copyHandler = ()=> {
    Alert('Copiado!');
    navigator.clipboard.writeText(children);
  };

  return (
    <div className='input'>
      <input
        // autoComplete={autoComplete}
        type='text'
        // name={name}
        // onChange={onChange}
        value={children}
        id={placeholder}
        placeholder={placeholder}
        // ref={Input}
      />
      <div>
        <button className='copyButton' onClick={copyHandler} type='button' tabIndex='-1'>
          <Icon type='copy' stroke='#4700AB' />
        </button>
      </div>
      <label htmlFor={placeholder} >{placeholder}</label>
      <p>{text}</p>
    </div>
  );

};

export default App;
