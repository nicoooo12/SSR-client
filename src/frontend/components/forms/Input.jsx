import React from 'react';
import Icon from '../display/Icon';
import '../../assets/styles/components/forms/Input.scss';
const App = ({ type, placeholder, name, value = '', text = '', onChange, autoComplete = 'true', Ref })=> {

  const Input = React.createRef(Input);

  const d = +new Date();

  const delHandler = ()=> {
    Input.current.value = '';
    onChange();
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
      />
      <div>
        <button onClick={delHandler} type='button' tabIndex='-1'>
          <Icon type='close' />
        </button>
      </div>
      <label htmlFor={placeholder} >{placeholder}</label>
      {
        type === 'password' ?
          <div>
            <input type='checkbox' name='' id={'password-view-' + d} onClick={(e)=>{
              if (e.target.checked) {Input.current.type = 'text';} else {Input.current.type = 'password';}
            }}
            /> <label htmlFor={'password-view-' + d}>Mostrar contraseña</label>
          </div> : <></>
      }
      <p>{text}</p>
    </div>
  );

};

export default App;
