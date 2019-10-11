export interface CardType { 
  suit: string;
  num: number;
  hide: boolean;
}
export type CardResult = number | 'Bust';

export type calcFunc = (hand: CardType[]) => CardResult;
export type pickFunc = () => CardType;