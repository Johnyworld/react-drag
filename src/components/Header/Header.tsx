import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import routes from '../../routes';
import Menubar from '../Menubar';
import './Header.scss';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];

  const menus = useMemo(() => {
    return [
      { id: 'root', text: 'List', href: routes.root },
      { id: 'grid', text: 'Grid', href: routes.grid },
    ];
  }, []);

  return (
    <header className='header'>
      <Menubar menus={menus} selected={path || 'root'} />
    </header>
  );
};

export default Header;
