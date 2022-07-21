import React from 'react';
import { connect } from 'react-redux';
import Modal from './components/modal';
import { Link } from 'react-router-dom';
import Button from './components/forms/Button';
import _1 from './assets/images/1.png';
import _2 from './assets/images/2.png';
import _3 from './assets/images/3.png';
import _4 from './assets/images/4.png';
import _5 from './assets/images/5.png';

const Home = ({ varsBingo }) =>{
  return (<>
    <div className='banner-img' >
      <img src={_1} alt='' className='img' />
      <Modal btn='Más información'>
        <h1>Ayuda a Isabelita</h1>
        <p>
        Isabelita es una niña pequeña. Hace un par de meses, se le detectó un tumor en su cabeza. El tumor en cuestión es pequeño, mas la localización dificulta el estudio del mismo y por ende su tratamiento. En este momento, se precisa hacer un tratamiento progresivo para disminuir el tamaño del tumor sin perjudicar el crecimiento de Isabel, posteriormente se podría realizar una operación para extraer el tumor, todo depende de como progrese su enfermedad. Como podrán suponer, el tratamiento no es nada barato, y de hecho solo la biopsia ha costado ya quince millones de pesos, por lo dificultoso que es acceder al lugar donde se localiza el tumor, por ende se sobreentiende lo caro que será todo el proceso.<br/>
        Como generación y comunidad Saint Paul’s, hemos organizado este bingo en pos de recaudar fondos para el tratamiento y todos los gastos relacionados. Nuestras esperanzas y corazones están con Isabelita.
        </p>
      </Modal>
    </div>

    <div className='banner-img' >
      <img src={_3} alt='' className='img' />
      <Modal btn='Más información' >
        <h1>Bingo!</h1>
        <p>
        Se tiene la posibilidad de comprar varios cartones, los cuales podrá jugar tanto en papel si decide imprimir el cartón o en su dispositivo electrónico, si es que está jugándolo en papel puede simplemente activar su micrófono y decir ¡BINGO!, luego debe dar el correo con el que se registró para revisar su bingo, y en caso de estar jugando en el dispositivo simplemente presione el botón de bingo para que el administrador revise su cartón.<br/>
        Para comprar los bingos simplemente agréguelos al carro y posteriormente vaya a terminar la compra, realice la transferencia, luego envíe el comprobante para que sea revisado y finalmente se le entregue el cartón del bingo a usted.<br/>
        Habrá un total de seis bingos, cada uno con tres premios, de linea, letra y cartón completo. El juego tendrá un animador de principio a fin para aligerar y entretener el ambiente.
        </p>
        <Link to='catalogo'>
          <Button>Ir a comprar!</Button>
        </Link>
      </Modal>
    </div>

    <div className='banner-img' >
      <img src={_2} alt='' className='img' />
      <Modal btn='Ir ver' >
        <h1>Premios</h1>
        <p>
        Existirán varios premios, los más grandes obviamente se darán por cartón completo, pero también se entregarán premios menores por línea y letra.<br/>
        Los premios correspondientes a cada bingo se pueden ver en la descripción de este al comprarlo.
        </p>
      </Modal>
    </div>

    <div className='banner-img' >
      <img src={_5} alt='' className='img' />
      <Modal btn='Donar aquí!' >
        <h1>Has tu donaciones</h1>
        <p>
        Comprar los cartones no es la única forma de ayudar en esta noble causa, existe otra manera de colaborar: donar es una excelente opción. Si lo prefieres puedes colaborar de forma directa, ¡Cualquier cantidad sirve! Ayudar en esta causa significará un gran aporte para Isabelita y su familia. Si de verdad lo quiere realice una transferencia a la cuenta
          <br/>
          <br/>
          <table className='bank__table' style={{ background: '#F7F7FC', borderRadius: '10px', padding: '10px' }}>
            <thead>
              {/* <tr>
                <th className='th__start'>Correo </th>
                <th className='th__end'>example@example.com</th>
              </tr> */}
            </thead>
            <tbody>
              <tr>
                <td className='td__start'>Numero de cuenta:</td>
                <td className='td__end'>{varsBingo.pago?.numCuenta}</td>
              </tr>
              <tr>
                <td className='td__start'>Rut:</td>
                <td className='td__end'>{varsBingo.pago?.rut}</td>
              </tr>
              <tr>
                <td className='td__start'>Titular:</td>
                <td className='td__end'>{varsBingo.pago?.titular}</td>
              </tr>
              <tr>
                <td className='td__start'>Banco:</td>
                <td className='td__end'>{varsBingo.pago?.banco}</td>
              </tr>
              <tr>
                <td className='td__start'>Correo:</td>
                <td className='td__end'>{varsBingo.pago?.correo}</td>
              </tr>
              <tr>
                <td className='td__start'>Motivo de la transferencia:</td>
                <td className='td__end'>{varsBingo.pago?.motivo}</td>
              </tr>
            </tbody>
          </table>
          <br/><br/>
        ¡Muchas gracias por interesarse en este causa y querer ayudar desde el corazón!
        </p>
      </Modal>
    </div>

    <div className='banner-img' >
      <img src={_4} alt='' className='img' />
      <Link to='help'>
        <Button autoLogin={false} > Ayuda!</Button>
      </Link>
    </div>
  </>);
};

const mapStateToProps = (state)=>{
  return {
    varsBingo: state.vars,
  };
};

export default {
  home: connect(mapStateToProps)(Home),
};
