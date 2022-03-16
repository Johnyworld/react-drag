import React, { useCallback, useEffect, useState } from 'react';
import { GrabItem, Vec2 } from 'types';
import Card from '../Card';
import './DraggingCard.scss';

export interface DraggingCardProps {
  grabItem: GrabItem | null;
  listLength: number;
  setMovIndex: (movIndex: number) => void;
}

const CARD_HEIGHT = 50;
const CARD_GAP = 4;

const DraggingCard: React.FC<DraggingCardProps> = ({ children, grabItem, listLength, setMovIndex }) => {
  const [dragPos, setDragPos] = useState<Vec2 | null>(null);
  const [idx, setIdx] = useState<number | null>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      if (!grabItem) return;
      const x = e.clientX - grabItem.clientX;
      const y = e.clientY - grabItem.clientY;
      const movIndex = grabItem.data.index + Math.round(y / (CARD_HEIGHT + CARD_GAP));
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
          <Card
            data={grabItem.data}
            style={{
              position: 'absolute',
              top: grabItem.y + dragPos.y,
              left: grabItem.x + dragPos.x,
              width: grabItem.width,
              height: grabItem.height,
              cursor: 'grabbing',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DraggingCard;
