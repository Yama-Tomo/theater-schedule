<template lang="pug">
section
  div 公演名・会場名・出演者で検索できます
  input(class="input" type="text" @keyup="onSearchWordChanged")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ActionTree } from '@/store/module_mapper';
import { HTMLElementEvent } from '@/types/dom';

@Component
export default class extends Vue {
  @Prop(Object) public actions!: ActionTree['schedules'];

  public setTimeoutId: null | NodeJS.Timeout = null;

  public onSearchWordChanged(event: HTMLElementEvent<HTMLInputElement>) {
    if (this.setTimeoutId !== null) {
      clearTimeout(this.setTimeoutId);
    }

    this.setTimeoutId = setTimeout(() => {
      this.actions.updateSearchWord(event.target.value.trim());
      this.setTimeoutId = null;
    }, 400);
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/_variables';
@import '~assets/scss/schedules/_variables';

section {
  margin-left: -$padding;
  margin-right: -$padding;
  padding-left: $padding;
  padding-right: $padding;

  background-color: #ded9d3;
  text-align: center;
  color: $main-font-color;

  div {
    font-weight: 700;
  }

  input {
    width: 80%;
  }
}

@media (min-width: $desktop) {
  section {
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
