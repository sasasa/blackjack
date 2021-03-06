<template>
  <div class="player">
    <transition-group name="flip" mode="out-in" class="flex" tag="div">
      <card v-for="(card, index) in hand"
        v-bind:key="index" 
        v-bind:suit="card.suit" 
        v-bind:num="card.num" 
        v-bind:hide="card.hide">
      </card>
    </transition-group>
    <transition>
    <div class="flex" v-show="showButtons">
      <button v-on:click="hit">Hit</button>
      <button v-on:click="stand">Stand</button>
    </div>
    </transition>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
import { CardType, CardResult } from '../utils/type.d';
import { BUST } from '../utils/define';
import pick from '../utils/deck';
import calc from '../utils/calc';
import Card from './Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class Player extends Vue {
  @Prop()
  private showButtons!: boolean;
  private hand: CardType[] = [];
  private result: CardResult = 0;
  private created() {
    this.hand.push(pick());
    this.hand[0].hide = true;
    this.hand.push(pick());
    this.hand[1].hide = true;
    setTimeout(() => {
      const card = this.hand.shift();
      setTimeout(() => {
        if (card) {
          card.hide = false;
          this.hand.unshift(card);
        }
      }, 300);
    }, 300);
    setTimeout(() => {
      const card = this.hand.pop();
      setTimeout(() => {
        if (card) {
          card.hide = false;
          this.hand.push(card);
        }
      }, 300);
    }, 300);
    this.result = calc(this.hand);
  }
  private hit() {
    this.hand.push(pick());
    this.result = calc(this.hand);
  }
  @Emit('stand')
  private stand(): CardResult {
    return this.result;
  }

  @Watch('result')
  private monitoringResult(newValue: CardResult, oldValue: CardResult) {
    if (newValue === BUST) {
      this.$emit('stand', newValue);
    }
  }
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}

.flip-enter-active,
.flip-leave-active {
  transition: 0.5s;
}
.flip-enter,
.flip-leave-to {
  transform: rotateY(90deg);
}

.flex {
  display: flex;
  justify-content: center;
}
button {
  font-size: 1.5rem;
  font-weight: bold;
  width: 100px;
  height: 48px;
  margin: 1rem;
  color: white;
  background: #42b983;
  border-radius: 10px;
}
</style>