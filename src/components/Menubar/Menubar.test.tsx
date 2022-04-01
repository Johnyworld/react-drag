import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menubar from './Menubar';
import MenubarItem from './MenubarItem';

const menus = [
  { id: 'menu1', text: 'Menu 1', href: 'https://example.com/1' },
  { id: 'menu2', text: 'Menu 2', href: 'https://example.com/2' },
  { id: 'menu3', text: 'Menu 3', href: 'https://example.com/3' },
];

test('각 리스트 아이템을 렌더합니다.', () => {
  render(
    <MemoryRouter>
      <MenubarItem item={menus[0]} />{' '}
    </MemoryRouter>
  );
  const itemEl = screen.getByText('Menu 1');
  expect(itemEl).toBeInTheDocument();
  expect(itemEl).toHaveAttribute('href');
});

test('리스트 아이템을 모두 렌더 합니다.', () => {
  render(
    <MemoryRouter>
      <Menubar menus={menus} />
    </MemoryRouter>
  );
  const listItems = screen.getAllByRole('listitem');
  expect(listItems.length).toEqual(menus.length);
  listItems.forEach((node, i) => {
    expect(node.textContent).toBe(menus[i].text);
  });
});

test('선택 된 아이템에 클래스를 부여합니다.', () => {
  render(
    <MemoryRouter>
      <Menubar selected='menu2' menus={menus} />
    </MemoryRouter>
  );
  const menu1El = screen.getByText('Menu 1');
  const menu2El = screen.getByText('Menu 2');
  expect(menu1El).not.toHaveClass('menubar__anchor--selected');
  expect(menu2El).toHaveClass('menubar__anchor--selected');
});
