import { CardType } from './type.d'


const calc: (hand: CardType[]) => number|string = (hand: CardType[]) => {
  const points = hand.map(card => (card.number > 10 ? 10 : card.number))
  const sum = points.reduce((ret, cur) => ret + cur)

  if (sum > 21) {
    return 'Bust'
  }
  // 合計が11以下で1(A)を含むなら+10する
  if (sum <= 11 && points.some(a => a === 1)) {
    return sum + 10
  }
  return sum
}

export default calc