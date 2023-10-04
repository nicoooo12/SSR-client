import React from 'react';
import Icon from '../display/Icon';
import '../../assets/styles/components/forms/Input.scss';
const App = ({ type, placeholder, name, value = '', text = '', children, onChange, autoComplete = 'true', Ref })=> {

  const Input = React.createRef(Input);

  const delHandler = ()=> {
    Input.current.value = '';
  };

  return (
    <div className='input' ref={Ref}>
      <input
        autoComplete={autoComplete}
        type={type}
        name={name}
        onChange={onChange}
        id={placeholder}
        placeholder={placeholder}
        ref={Input}
        defaultValue={value}
        list='datalistOptions'
      />
      <div>
        <button onClick={delHandler} type='button' tabIndex='-1'>
          <Icon type='close' />
        </button>
      </div>
      <label htmlFor={placeholder} >{placeholder}</label>
      <datalist id='datalistOptions'>
        {children}
      </datalist>
      <p>{text}</p>
    </div>
  );

};

export default App;
