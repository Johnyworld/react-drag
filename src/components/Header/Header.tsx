import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <header className='header'>
      <Link className={pathname === '/react-drag' ? 'selected' : ''} to='/react-drag'>
        List
      </Link>
      <Link className={pathname === '/react-drag/grid' ? 'selected' : ''} to='/react-drag/grid'>
        Grid
      </Link>
    </header>
  );
};

export default Header;
