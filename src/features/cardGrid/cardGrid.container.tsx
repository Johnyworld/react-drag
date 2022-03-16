import React from 'react';
import useCardList from '../../hooks/useCardList';
import CardGrid from './components/CardGrid';

const CardGridContainer: React.FC = () => {
  const { list, onDrop } = useCardList();
  return <CardGrid list={list} onDrop={onDrop} />;
};

export default CardGridContainer;
