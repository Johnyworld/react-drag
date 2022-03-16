import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import routes, { getWashedPathname } from '../../routes';
import './Header.scss';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const path = getWashedPathname(pathname).split('/')[1];
  return (
    <header className='header'>
      <Link className={path === '' ? 'selected' : ''} to={routes.root}>
        List
      </Link>
      <Link className={path === 'grid' ? 'selected' : ''} to={routes.grid}>
        Grid
      </Link>
    </header>
  );
};

export default Header;
