import { createContext } from 'react';
import { CardItem } from 'types';

interface CardContext {
  list: CardItem[];
  onDrop: (from: number, to: number) => void;
}

const cardContext = createContext<CardContext>({} as CardContext);

export default cardContext;
