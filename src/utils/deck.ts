import { CardType } from './type.d'

const deck: CardType[] = [];

// デッキを作成
['spade', 'club', 'diamond', 'heart'].forEach(suit => {
  Array.from(Array(13), (_, i) => ++i).forEach(number => {
    deck.push({ suit, number, hide: false })
  })
})

// デッキから一つランダムに取り除く
const pick: () => CardType = () => {
  return deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0]
}
export default pick