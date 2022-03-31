import React from 'react';
import { useLocation } from 'react-router-dom';
import routes from '../../routes';
import Menubar from '../Menubar';
import './Header.scss';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];

  return (
    <header className='header'>
      <Menubar
        menus={routes.map(data => ({ id: data.id, text: data.name, href: data.path }))}
        selected={path || 'list'}
      />
    </header>
  );
};

export default Header;
