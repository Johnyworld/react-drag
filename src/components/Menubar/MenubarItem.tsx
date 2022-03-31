import React from 'react';
import { Link } from 'react-router-dom';

export interface MenuItem {
  id: string;
  text: string;
  href: string;
}

export interface MenubarItemProps {
  item: MenuItem;
  isSelected?: boolean;
}

const MenubarItem: React.FC<MenubarItemProps> = ({ item, isSelected }) => {
  const { text, href } = item;
  return (
    <li className='menubar__item'>
      <Link className={'menubar__anchor' + (isSelected ? ' menubar__anchor--selected' : '')} to={href}>
        {text}
      </Link>
    </li>
  );
};

export default MenubarItem;
