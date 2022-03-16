import React, { useState } from 'react';
import { CardItem } from 'types';
import { cards } from '../cards/cards.fixture';
import CardGrid from './components/CardGrid';

const getNewIndex = (from: number, to: number, index: number) => {
  // from이 to보다 작으면 to보다 같거나 작고 from보다 큰 index들은 -1
  // from이 to보다 크면 to보다 같거나 크고 from보다 작은 index들은 +1
  // from의 index는 to의 index로.
  if (index === from) return to;
  if (from < to && index <= to && index > from) {
    return index - 1;
  } else if (from > to && index >= to && index < from) {
    return index + 1;
  } else return index;
};

const CardGridContainer: React.FC = () => {
  const [list, setList] = useState<CardItem[]>(cards);
  const handleMove = (from: number, to: number) => {
    setList(
      list
        .map(item => {
          return { ...item, index: getNewIndex(from, to, item.index) };
        })
        .sort((a, b) => (a.index < b.index ? -1 : 1))
    );
  };
  return <CardGrid list={list} onMove={handleMove} />;
};

export default CardGridContainer;
