import React, { useState } from 'react';
import { CardItem } from 'types';
import CardList from '../../components/CardList/CardList';

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

const CardListContainer: React.FC = () => {
  const [list, setList] = useState<CardItem[]>([
    { index: 0, id: 'coff', emogi: '☕', title: 'Coffee' },
    { index: 1, id: 'juce', emogi: '🧃', title: 'Juice' },
    { index: 2, id: 'coke', emogi: '🧋', title: 'Bubble Tea' },
    { index: 3, id: 'milk', emogi: '🥛', title: 'Milk' },
    { index: 4, id: 'beer', emogi: '🍺', title: 'Beer' },
    { index: 5, id: 'wisk', emogi: '🍸', title: 'Wiskey' },
    { index: 6, id: 'lacc', emogi: '🍶', title: 'Sake' },
    { index: 7, id: 'cokt', emogi: '🍹', title: 'Cocktail' },
  ]);

  const handleMove = (from: number, to: number) => {
    setList(
      list
        .map(item => {
          return { ...item, index: getNewIndex(from, to, item.index) };
        })
        .sort((a, b) => (a.index < b.index ? -1 : 1))
    );
  };

  return <CardList list={list} onMove={handleMove} />;
};

export default CardListContainer;
