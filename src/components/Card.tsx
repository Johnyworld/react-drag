import React from 'react';
import { CardItem } from 'types';
import './Card.scss';

export interface CardProps {
  data: CardItem;
  isGrab?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ data, isGrab, className, style, children, onMouseDown }) => {
  const { title, emogi } = data;
  return (
    <div style={style} onMouseDown={onMouseDown} className={'card ' + className + (isGrab ? ' card--grab' : '')}>
      <span className='card__emogi'>{emogi}</span>
      {title}
    </div>
  );
};

export default Card;
