import { CardType, pickFunc } from './type.d';

const deck: CardType[] = [];

// デッキを作成
['spade', 'club', 'diamond', 'heart'].forEach((suit) => {
  Array.from(Array(13), (_, i) => ++i).forEach((num) => {
    deck.push({ suit, num, hide: false });
  });
});

// デッキから一つランダムに取り除く

const pick: pickFunc = () => {
  return deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0];
};
export default pick;
