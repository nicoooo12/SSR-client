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
        type='text'
        value={children}
        id={placeholder}
        placeholder={placeholder}
        list='datalistOptions'
      />
      <div>
        <button className='copyButton' onClick={copyHandler} type='button' tabIndex='-1'>
          <Icon type='copy' stroke='#4700AB' />
        </button>
      </div>
      <label htmlFor={placeholder} >{placeholder}</label>
      <datalist id='datalistOptions'>
        <option value='San Francisco' />
        <option value='New York' />
        <option value='Seattle' />
        <option value='Los Angeles' />
        <option value='Chicago' />
      </datalist>
      <p>{text}</p>
    </div>
  );

};

export default App;
