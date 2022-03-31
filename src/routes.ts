import React from 'react';
import CardGridContainer from './features/cardGrid/cardGrid.container';
import CardListContainer from './features/cardList/cardList.container';

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
    component: CardListContainer,
  },
  {
    id: 'grid',
    name: 'Grid',
    path: ROOT + '/grid',
    component: CardGridContainer,
  },
];

export default routes;
