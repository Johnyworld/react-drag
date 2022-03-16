import React, { useCallback, useEffect, useState } from 'react';
import { GrabItem, Vec2 } from 'types';
import CardGridItem from '../CardGridItem';
import './DraggingCard.scss';

export interface DraggingCardProps {
  grabItem: GrabItem | null;
  listLength: number;
  setMovIndex: (movIndex: number) => void;
}

const CARD_WIDTH = 150;
const CARD_HEIGHT = 120;
const CARD_GAP = 4;

const COLUMN = 4;

const DraggingCard: React.FC<DraggingCardProps> = ({ children, grabItem, listLength, setMovIndex }) => {
  const [dragPos, setDragPos] = useState<Vec2 | null>(null);
  const [idx, setIdx] = useState<number | null>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      if (!grabItem) return;
      const x = e.clientX - grabItem.clientX;
      const y = e.clientY - grabItem.clientY;
      const xIndex = grabItem.data.index % 4;
      const yIndex = Math.floor(grabItem.data.index / 4);
      const yMaxLen = Math.floor((listLength - 1) / 4);
      const movIndexX = xIndex + Math.round(x / (CARD_WIDTH + CARD_GAP));
      const movIndexY = yIndex + Math.round(y / (CARD_HEIGHT + CARD_GAP));
      const actualMovIndexX = movIndexX < 0 ? 0 : movIndexX > COLUMN - 1 ? COLUMN - 1 : movIndexX;
      const actualMovIndexY = movIndexY < 0 ? 0 : movIndexY > yMaxLen ? yMaxLen : movIndexY;
      const movIndex = actualMovIndexX + actualMovIndexY * COLUMN;
      setIdx(movIndex < 0 ? 0 : movIndex > listLength - 1 ? listLength - 1 : movIndex);
      setDragPos({ x, y });
    },
    [grabItem, listLength]
  );

  useEffect(() => {
    if (!grabItem || idx === null) return;
    setMovIndex(idx);
    setIdx(null);
  }, [grabItem, idx, setMovIndex]);

  return (
    <div onMouseMove={handleMouseMove}>
      {children}
      {grabItem && dragPos && (
        <div className='dragging-card'>
          <CardGridItem
            data={grabItem.data}
            style={{
              top: grabItem.y + dragPos.y + 'px',
              left: grabItem.x + dragPos.x + 'px',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DraggingCard;
