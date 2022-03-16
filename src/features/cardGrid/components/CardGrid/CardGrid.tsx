import React, { useCallback, useEffect, useState } from 'react';
import { CardItem, GrabItem } from 'types';
import CardGridItem from '../CardGridItem';
import DraggingCard from '../DraggingCard';
import './CardGrid.scss';

export interface CardGridProps {
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

const CardGrid: React.FC<CardGridProps> = ({ list, onMove }) => {
  const [grabItem, setGrabItem] = useState<GrabItem | null>(null);
  const [movIndex, setMovIndex] = useState<number | null>(null);

  const handleGrab: (item: CardItem) => React.MouseEventHandler<HTMLDivElement> = useCallback(
    item => e => {
      const rect = e.currentTarget.getBoundingClientRect();
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
              style={grabItem ? { transition: '0.3s' } : undefined}
              isGrab={grabItem?.data.id === item.id}
              onMouseDown={handleGrab(item)}
            />
          );
        })}
      </div>
    </DraggingCard>
  );
};

export default CardGrid;
