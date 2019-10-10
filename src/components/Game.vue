<template>
  <div class="game">
    <Dealer ref="dealer" v-on:result="postexec" />
    <div class="message">
      {{ mainMessage }}
    </div>
    <Player v-on:stand="stand" v-bind:showButtons="showButtons" />
    <transition>
      <div v-if="resultMessage !== ''" class="message result">
        {{ resultMessage }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Dealer from './Dealer.vue'
import Player from './Player.vue'

@Component({
  components: {
    Dealer,
    Player,
  },
})
export default class Game extends Vue {
  private mainMessage = 'Welcome to Black Jack'
  private playersResult: number|string = 0
  private dealersResult: number|string = 0
  private showButtons = true

  private stand (playersResult: number|string) {
    this.playersResult = playersResult;
    this.showButtons = false
    this.$refs.dealer.$emit('dealer-turn', playersResult === 'Bust')
  }
  private postexec (dealersResult: number|string) {
    this.dealersResult = dealersResult
    this.mainMessage = `Dealer : ${dealersResult} / Player : ${this.playersResult}`
  }

  get resultMessage () {
    if (this.showButtons) {
      return ''
    }
    if (this.playersResult > this.dealersResult || this.dealersResult === 'Bust') {
      return 'You Win'
    }
    if (this.playersResult < this.dealersResult || this.playersResult === 'Bust') {
      return 'You Lose'
    }
    return 'Draw'
  }
}

</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: 1s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}
.message {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 2rem;
}
.result {
  font-size: 3rem;
  color: orangered;
}
</style>