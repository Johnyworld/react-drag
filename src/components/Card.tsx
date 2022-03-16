import React from 'react';
import './Card.scss';

export interface CardProps {
  isGrab?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ isGrab, className, style, children, onMouseDown }) => {
  return (
    <div style={style} onMouseDown={onMouseDown} className={'card ' + className + (isGrab ? ' card--grab' : '')}>
      {children}
    </div>
  );
};

export default Card;
