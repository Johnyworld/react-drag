import React from 'react';
import { CardItem } from 'types';
import useGrab, { getAbsolutePosition, getIsMoving } from '../../../../hooks/useGrab';
import Card from '../Card';
import DraggingCard from '../DraggingCard';
import './CardList.scss';

interface CardListProps {
  list: CardItem[];
  onDrop: (index: number, targetIndex: number) => void;
}

const CardList: React.FC<CardListProps> = ({ list, onDrop }) => {
  const { grabItem, movIndex, setMovIndex, onGrab } = useGrab(onDrop);

  return (
    <DraggingCard grabItem={grabItem} listLength={list.length} setMovIndex={setMovIndex}>
      <div className='card-list'>
        {list.map(item => {
          const absolutePos = getAbsolutePosition(item, grabItem);
          const isMoving = getIsMoving(item, movIndex, absolutePos);

          return (
            <Card
              data={item}
              key={item.index}
              style={grabItem ? { transition: 'transform 0.3s' } : undefined}
              className={isMoving ? `card--${absolutePos}` : ''}
              isGrab={grabItem?.data.id === item.id}
              onMouseDown={onGrab(item)}
            />
          );
        })}
      </div>
    </DraggingCard>
  );
};

export default CardList;
