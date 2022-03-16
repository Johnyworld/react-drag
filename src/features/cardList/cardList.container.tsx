import React from 'react';
import useCardList from '../../hooks/useCardList';
import CardList from './components/CardList/CardList';

const CardListContainer: React.FC = () => {
  const { list, onDrop } = useCardList();
  return <CardList list={list} onDrop={onDrop} />;
};

export default CardListContainer;
