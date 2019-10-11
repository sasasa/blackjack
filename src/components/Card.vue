<template>
  <div class="card">
    <img v-bind:src="image" height="160">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Card extends Vue {
  @Prop()
  private num!: number;

  @Prop()
  private suit!: string;

  @Prop()
  private hide!: boolean;

  get image(): string {
    const filename = this.hide ? 'back' : `${this.suit}_${this.num.toString().padStart(2, '0')}`;
    return require(`../assets/card_${filename}.png`);
  }
}

</script>