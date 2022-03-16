import React, { useContext } from 'react';
import cardContext from '../cards/cards.context';
import CardList from './components/CardList/CardList';

const CardListContainer: React.FC = () => {
  const { list, onDrop } = useContext(cardContext);
  return <CardList list={list} onDrop={onDrop} />;
};

export default CardListContainer;
