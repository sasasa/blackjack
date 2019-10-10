<template>
  <div class="dealer">
    <transition-group name="flip" mode="out-in" class="flex" tag="div">
      <Card v-for="(card, index) in hand"
        v-bind:key="index"
        v-bind:suit="card.suit"
        v-bind:number="card.number"
        v-bind:hide="card.hide">
      </Card>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

import { CardType } from '../utils/type.d'
import pick from '../utils/deck'
import calc from '../utils/calc'
import Card from './Card.vue'

@Component({
  components: {
    Card,
  },
})
export default class Dealer extends Vue {
  private hand: CardType[] = []
  
  private created () {
    this.hand.push(pick());
    this.hand[0].hide = true;
    this.hand.push(pick());
    this.hand[1].hide = true;

    setTimeout(() => {
      const card = this.hand.pop()
      setTimeout(() => {
        this.hand.push(card)
        card.hide = false;
      }, 300)
    }, 300)
    // dealer-turnイベントを待ち受けてthis.dealerTurnを実行
    this.$on('dealer-turn', this.dealerTurn)
  }

  @Emit('result')
  private dealerTurn (playerBust: boolean) {
    this.hand[0].hide = false;

    while (!playerBust && calc(this.hand) < 17) {
      this.hand.push(pick())
      this.hand[this.hand.length - 1].hide = true;

      setTimeout(() => {
        const card = this.hand.pop()
        setTimeout(() => {
          this.hand.push(card)
          card.hide = false;
        }, 300)
      }, 300)
    }
    return calc(this.hand)
  }
}
</script>

<style lang="scss" scoped>
// .flip-enter-active,
// .flip-leave-active,
// .flip-move {
//   transition: 0.5s;
// }
.flip-enter-active,
.flip-leave-active {
  transition: 0.5s;
}
.flip-enter,
.flip-leave-to {
  transform: rotateY(90deg);
}
// .v-leave-active {
//   position: absolute;
// }
.flex {
  display: flex;
  justify-content: center;
}
</style>