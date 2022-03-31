import React from 'react';
import './Menubar.scss';
import MenubarItem, { MenuItem } from './MenubarItem';

export interface MenubarProps {
  selected?: string;
  menus: MenuItem[];
}

const Menubar: React.FC<MenubarProps> = ({ selected, menus }) => {
  return (
    <ul className='menubar'>
      {menus.map(item => (
        <MenubarItem key={item.id} item={item} isSelected={selected === item.id} />
      ))}
    </ul>
  );
};

export default Menubar;
