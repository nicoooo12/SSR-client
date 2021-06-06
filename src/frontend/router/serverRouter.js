import Home from '../containers/Home';
import Catalogo from '../containers/Catalogo';
import Compra from '../containers/Compra';
import Cartones from '../containers/Cartones';
import Ordenes from '../containers/Ordenes';
import Play from '../containers/Play';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Contacto from '../containers/Contacto';
import Ayuda from '../containers/Ayuda';
import Notfound from '../containers/Notfound';

const routers = (isLogged)=>{
  return [
    {
      exact: true,
      path: '/',
      component: Home,
    },
    {
      exact: true,
      path: '/catalogo',
      component: Catalogo,
    },
    {
      exact: true,
      path: '/cartones',
      component: Cartones,
    },
    {
      exact: true,
      path: '/compra',
      component: Compra,
    },
    {
      exact: true,
      path: '/ordenes',
      component: Ordenes,
    },
    {
      exact: true,
      path: '/play',
      component: Play,
    },
    {
      exact: true,
      path: '/sign-up',
      component: SignUp,
    },
    {
      exact: true,
      path: '/sign-in',
      component: SignIn,
    },
    {
      exact: true,
      path: '/contacto',
      component: Contacto,
    },
    {
      exact: true,
      path: '/help',
      component: Ayuda,
    },
    {
      exact: false,
      component: Notfound,
    },
  ];
};

export default routers;
