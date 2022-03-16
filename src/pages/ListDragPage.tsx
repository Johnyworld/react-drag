import React, { useState } from 'react';
import CardList, { CardItem } from '../components/CardList';
import './ListDragPage.scss';

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

const ListDragPage: React.FC = () => {
  const [list, setList] = useState<CardItem[]>([
    { index: 0, id: 'coff', title: 'Coffee' },
    { index: 1, id: 'juce', title: 'Juice' },
    { index: 2, id: 'coke', title: 'Coke' },
    { index: 3, id: 'milk', title: 'Milk' },
    { index: 4, id: 'beer', title: 'Beer' },
    { index: 5, id: 'lacc', title: 'Laccy' },
    { index: 6, id: 'bred', title: 'Bread' },
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

  return (
    <div className='list-drag-page'>
      <CardList list={list} onMove={handleMove} />
    </div>
  );
};

export default ListDragPage;
