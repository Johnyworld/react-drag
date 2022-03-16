import React, { useCallback, useEffect, useState } from 'react';
import { CardItem, GrabItem } from 'types';
import Card from '../Card';
import DraggingCard from '../DraggingCard';
import './CardList.scss';

interface CardListProps {
  list: CardItem[];
  onMove: (index: number, targetIndex: number) => void;
}

const getAbsolutePosition: (item: CardItem, grabItem: GrabItem | null) => 'up' | 'down' | null = (item, grabItem) => {
  if (!grabItem) return null;
  if (item.index > grabItem.data.index) return 'up';
  else if (item.index < grabItem.data.index) return 'down';
  else return null;
};

const getIsMoving = (item: CardItem, movIndex: number | null, absolutePos: 'up' | 'down' | null) => {
  if (movIndex === null || !absolutePos) return null;
  const sign = absolutePos === 'down' ? 1 : -1;
  return item.index * sign >= movIndex * sign;
};

const CardList: React.FC<CardListProps> = ({ list, onMove }) => {
  const [grabItem, setGrabItem] = useState<GrabItem | null>(null);
  const [movIndex, setMovIndex] = useState<number | null>(null);

  const handleGrab: (item: CardItem) => React.MouseEventHandler<HTMLDivElement> = useCallback(
    item => e => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMovIndex(item.index);
      setGrabItem({
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y,
        clientX: e.clientX,
        clientY: e.clientY,
        data: item,
      });
    },
    []
  );

  useEffect(() => {
    if (!grabItem || movIndex === null) return;
    const handleMouseUp = () => {
      onMove(grabItem.data.index, movIndex);
      setGrabItem(null);
      setMovIndex(null);
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [grabItem, movIndex, onMove]);

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
              onMouseDown={handleGrab(item)}
            />
          );
        })}
      </div>
    </DraggingCard>
  );
};

export default CardList;
