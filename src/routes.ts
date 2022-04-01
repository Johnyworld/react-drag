import React from 'react';
import GridPage from './pages/GridPage';
import ListPage from './pages/ListPage';

export interface PageMenu {
  id: string;
  name: string;
  path: string;
  component: React.FC;
}

const ROOT = '';

const routes: PageMenu[] = [
  {
    id: 'list',
    name: 'List',
    path: ROOT + '/list',
    component: ListPage,
  },
  {
    id: 'grid',
    name: 'Grid',
    path: ROOT + '/grid',
    component: GridPage,
  },
];

export default routes;
