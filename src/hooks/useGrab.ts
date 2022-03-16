import { useCallback, useEffect, useState } from 'react';
import { CardItem, GrabItem } from 'types';

export const getAbsolutePosition: (item: CardItem, grabItem: GrabItem | null) => 'up' | 'down' | null = (
  item,
  grabItem
) => {
  if (!grabItem) return null;
  if (item.index > grabItem.data.index) return 'up';
  else if (item.index < grabItem.data.index) return 'down';
  else return null;
};

export const getIsMoving = (item: CardItem, movIndex: number | null, absolutePos: 'up' | 'down' | null) => {
  if (movIndex === null || !absolutePos) return null;
  const sign = absolutePos === 'down' ? 1 : -1;
  return item.index * sign >= movIndex * sign;
};

const useGrab = (onDrop: (index: number, targetIndex: number) => void) => {
  const [grabItem, setGrabItem] = useState<GrabItem | null>(null);
  const [movIndex, setMovIndex] = useState<number | null>(null);

  const onGrab: (item: CardItem) => React.MouseEventHandler<HTMLDivElement> = useCallback(
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
      onDrop(grabItem.data.index, movIndex);
      setGrabItem(null);
      setMovIndex(null);
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [grabItem, movIndex, onDrop]);

  return {
    grabItem,
    movIndex,
    setMovIndex,
    onGrab,
  };
};

export default useGrab;
