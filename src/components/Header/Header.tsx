import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <header className='header'>
      <Link className={pathname === '/' ? 'selected' : ''} to='/'>
        List
      </Link>
      <Link className={pathname === '/grid' ? 'selected' : ''} to='/grid'>
        Grid
      </Link>
    </header>
  );
};

export default Header;
