import React, { useContext } from 'react';
import cardContext from '../cards/cards.context';
import CardGrid from './components/CardGrid';

const CardGridContainer: React.FC = () => {
  const { list, onDrop } = useContext(cardContext);
  return <CardGrid list={list} onDrop={onDrop} />;
};

export default CardGridContainer;
