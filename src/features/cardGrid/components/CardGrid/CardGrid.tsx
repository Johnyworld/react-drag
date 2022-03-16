import React from 'react';
import { CardItem } from 'types';
import useGrab, { getAbsolutePosition, getIsMoving } from '../../../../hooks/useGrab';
import CardGridItem from '../CardGridItem';
import DraggingCard from '../DraggingCard';
import './CardGrid.scss';

export interface CardGridProps {
  list: CardItem[];
  onDrop: (index: number, targetIndex: number) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ list, onDrop }) => {
  const { grabItem, movIndex, setMovIndex, onGrab } = useGrab(onDrop);

  return (
    <DraggingCard grabItem={grabItem} listLength={list.length} setMovIndex={setMovIndex}>
      <div className='card-grid'>
        {list.map(item => {
          const absolutePos = getAbsolutePosition(item, grabItem);
          const isMoving = getIsMoving(item, movIndex, absolutePos);
          const viewIndex =
            !isMoving || !absolutePos ? item.index : absolutePos === 'down' ? item.index + 1 : item.index - 1;
          return (
            <CardGridItem
              key={item.id}
              data={{ ...item, index: viewIndex }}
              style={grabItem ? { transition: 'left 0.3s, top 0.3s' } : undefined}
              isGrab={grabItem?.data.id === item.id}
              onMouseDown={onGrab(item)}
            />
          );
        })}
      </div>
    </DraggingCard>
  );
};

export default CardGrid;
