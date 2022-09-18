import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../display/Icon';

import '../../assets/styles/components/headers/Layout.scss';

const Layout = ({ children, title = 'title', to = '/' }) => {
  return (
    <div className='layout_main'>
      <div className='layout_top'>
        <div className='layout_header'>
          <div className='layout_base'>
            <div className='layout_base_icon'>
              <Link to={to} >
                <Icon strokeWidth='2.5' type='arrow' />
              </Link>
            </div>
            <div className='layout_base_title'>Bingoloteando</div>
            <div className='layout_base_message'><Icon strokeWidth='2.5' type='help2' /></div>
          </div>
          <div className='layout_main_title-content'>
            <h1 className='layout_main_title-text'>
              {title}
            </h1>
            <div className='layout_main_title-icon'>
              {/* <Icon type='info' strokeWidth={2} /> */}
            </div>
          </div>
        </div>
        <div className='layout_corte'>
          <div className='layout_corte-border' />
        </div>
        <div className='layout_content'>
          {children}
        </div>
      </div>
      <div className='layout_bottom'>
        <footer>
          <div className='footer__content'>
            <h1 className='footer__title'>Bingolote<span className='subrayado' >ando</span></h1>
            <div className='footer__list'>
              <ul>
                <li>
                  <Link to='/help'>
                    <button tabIndex='-1'>
                      Ayuda
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to='/contacto'>
                    <button tabIndex='-1'>
                      Contacto
                    </button>
                  </Link>
                </li>
                {/* <li>
                  <Link to='/'>
                    <button tabIndex='-1'>
                      Evento
                    </button>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
