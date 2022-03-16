import React from 'react';
import CardListContainer from '../features/cardList/containers/CardListContainer';
import './ListDragPage.scss';

const ListDragPage: React.FC = () => {
  return (
    <div className='list-drag-page'>
      <CardListContainer />
    </div>
  );
};

export default ListDragPage;
