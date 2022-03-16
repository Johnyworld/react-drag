import React, { useEffect, useState } from 'react';
import Card from './Card';
import './CardList.scss';

export interface CardItem {
  index: number;
  id: string;
  title: string;
}

export interface CardListProps {
  list: CardItem[];
  onMove: (index: number, targetIndex: number) => void;
}

interface GrabItem {
  width: number;
  height: number;
  x: number;
  y: number;
  clientX: number;
  clientY: number;
  data: CardItem;
}

interface DragPos {
  x: number;
  y: number;
  movIndex: number;
  isMovUp: boolean | null;
}

const CARD_HEIGHT = 50;
const CARD_GAP = 4;

const getAbsolutePosition: (item: CardItem, grabItem: GrabItem | null) => 'up' | 'down' | null = (item, grabItem) => {
  if (!grabItem) return null;
  if (item.index > grabItem.data.index) return 'up';
  else if (item.index < grabItem.data.index) return 'down';
  else return null;
};

const getIsMoving = (item: CardItem, dragPos: DragPos | null, absolutePos: 'up' | 'down' | null) => {
  if (!dragPos || absolutePos === null) return null;
  const sign = absolutePos === 'down' ? 1 : -1;
  return item.index * sign >= dragPos.movIndex * sign;
};

const CardList: React.FC<CardListProps> = ({ list, onMove }) => {
  const [grabItem, setGrabItem] = useState<GrabItem | null>(null);
  const [dragPos, setDragPos] = useState<DragPos | null>(null);

  console.log('===== CardList', dragPos);

  const handleGrab: (item: CardItem) => React.MouseEventHandler<HTMLDivElement> = item => e => {
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
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!grabItem) return;
    const x = e.clientX - grabItem.clientX;
    const y = e.clientY - grabItem.clientY;
    const movIndex = grabItem.data.index + Math.round(y / (CARD_HEIGHT + CARD_GAP));
    const isMovUp = movIndex < grabItem.data.index ? true : movIndex > grabItem.data.index ? false : null;
    setDragPos({ x, y, movIndex: movIndex < 0 ? 0 : movIndex > list.length - 1 ? list.length - 1 : movIndex, isMovUp });
  };

  useEffect(() => {
    if (!grabItem || !dragPos) return;
    const handleMouseUp = () => {
      onMove(grabItem.data.index, dragPos.movIndex);
      setGrabItem(null);
      setDragPos(null);
    };
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [grabItem, dragPos, onMove]);

  return (
    <div onMouseMove={handleMouseMove}>
      <div className='card-list'>
        {list.map(item => {
          const absolutePos = getAbsolutePosition(item, grabItem);
          const isMoving = getIsMoving(item, dragPos, absolutePos);

          return (
            <Card
              key={item.index}
              style={grabItem ? { transition: 'transform 0.3s' } : undefined}
              className={isMoving ? `card--${absolutePos}` : ''}
              isGrab={grabItem?.data.id === item.id}
              onMouseDown={handleGrab(item)}
            >
              {item.title}
            </Card>
          );
        })}
      </div>
      {grabItem && dragPos && (
        <Card
          style={{
            position: 'absolute',
            top: grabItem.y + dragPos.y,
            left: grabItem.x + dragPos.x,
            width: grabItem.width,
            height: grabItem.height,
          }}
        >
          {grabItem.data.title}
        </Card>
      )}
    </div>
  );
};

export default CardList;
