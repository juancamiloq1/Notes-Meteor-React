import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return(
    <div className='boxed-view'>
      <div className='boxed-view__box'>
        <h1>Nada por aquí</h1>
        <p>No encontramos la pagina que buscabas.</p>
        <Link to='/' className='button button--link'>IR A INICIO</Link>
      </div>
    </div>
  );
};
