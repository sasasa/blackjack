import { CardType, CardResult, calcFunc } from './type.d';
import { BUST } from './define';

const calc: calcFunc = (hand: CardType[]) => {
  const points = hand.map((card) => (card.num > 10 ? 10 : card.num));
  const sum = points.reduce((ret, cur) => ret + cur);

  if (sum > 21) {
    return BUST;
  }
  // 合計が11以下で1(A)を含むなら+10する
  if (sum <= 11 && points.some((a) => a === 1)) {
    return sum + 10;
  }
  return sum;
};

export default calc;
