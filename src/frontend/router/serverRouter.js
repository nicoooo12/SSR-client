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
import Admin from '../containers/admin/Index';
import Tests from '../containers/Tests';
import Canjear from '../containers/Canjear';
import CanjearByCode from '../containers/CanjearByCode';
import AdminPlay from '../containers/admin/Play';
import AdminMetrics from '../containers/admin/Metrics';
import AdminOrden from '../containers/admin/Orden';
import AdminCartones from '../containers/admin/Cartones';
// import pay from '../containers/pagoPrueba';
import NotFound from '../containers/NotFound';

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
      exact: true,
      path: '/admin',
      component: Admin,
    },
    {
      exact: true,
      path: '/admin/play',
      component: AdminPlay,
    },
    {
      exact: true,
      path: '/admin/cartones',
      component: AdminCartones,
    },
    {
      exact: true,
      path: '/admin/metrics',
      component: AdminMetrics,
    },
    {
      exact: true,
      path: '/admin/metrics/:id',
      component: AdminOrden,
    },
    {
      exact: true,
      path: '/canjear/:code',
      component: CanjearByCode,
    },
    {
      exact: true,
      path: '/canjear',
      component: Canjear,
    },
    {
      exact: true,
      path: '/test',
      component: Tests,
    },
    {
      exact: false,
      component: NotFound,
    },
  ];
};

export default routers;
