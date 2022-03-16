import React from 'react';
import { CardItem } from 'types';
import './CardGridItem.scss';

export interface CardGridItemProps {
  data: CardItem;
  isGrab?: boolean;
  style?: React.CSSProperties;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
}

const CardGridItem: React.FC<CardGridItemProps> = ({ data, isGrab, style = {}, onMouseDown }) => {
  const { title, emogi, index } = data;

  const xIndex = index % 4;
  const yIndex = Math.floor(index / 4);
  const x = xIndex * (150 + 4);
  const y = yIndex * (120 + 4);

  return (
    <div
      className={'card-grid-item' + (isGrab ? ' card-grid-item--grab' : '')}
      style={{ left: x, top: y, ...style }}
      onMouseDown={onMouseDown}
    >
      <div>
        <p className='card-grid-item__emogi'>{emogi}</p>
        <h3 className='card-grid-item__title'>{title}</h3>
      </div>
    </div>
  );
};

export default CardGridItem;
