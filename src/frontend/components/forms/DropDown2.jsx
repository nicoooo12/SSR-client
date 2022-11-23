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
      {/* <input
        autoComplete={autoComplete}
        type={type}
        name={name}
        onChange={onChange}
        id={placeholder}
        placeholder={placeholder}
        ref={Input}
        defaultValue={value}
        list='datalistOptions'
      /> */}
      <select onChange={onChange} style={{ height: '84px' }} id={placeholder} name={placeholder} >
        {children}
      </select>
      <div style={{ height: '84px' }}>
        <button onClick={delHandler} type='button' tabIndex='-1' style={{ top: '36px', transform: 'rotate(-90deg)', height: '24px', with: '24px' }}>
          <Icon type='forward' width={16} />
        </button>
      </div>
      <label htmlFor={'datalistOptions-' + placeholder} >{placeholder}</label>
      <p>{text}</p>
    </div>
  );

};

export default App;
