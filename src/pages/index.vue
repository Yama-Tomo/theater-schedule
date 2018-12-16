<template lang="pug">
.content
  Overview
  Search(:actions="actions")
  Lists(:state="state")
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator';
import { Mixins } from 'vue-mixin-decorator';
import { StoreHelper, StoreHelperMixin, Actions as ActionsMapper } from '~/mixins/store_helper';
import { schedules } from '~/module_mapper';
import { NuxtContext } from '~/index.d';
import { Actions } from '~/store/schedules/actions';
import Overview from '~/components/schedules/overview.vue';
import Search from '~/components/schedules/search.vue';
import Lists from '~/components/schedules/lists.vue';

@Component({
  components: {
    Overview,
    Search,
    Lists,
  },
})
export default class extends Mixins<StoreHelperMixin>(StoreHelperMixin) {
  public async fetch(ctx: NuxtContext) {
    const actions: ActionsMapper<Actions> = StoreHelper.getActions(ctx.store, schedules);
    actions.fetchInitialState(undefined);
  }

  public head() {
    const description = '現在公演中の東京の主要な公演の上演時間をわかる範囲でまとめています。';

    return {
      link: [
        ... process.env.HOSTNAME ? [{ hid: 'canonical', name: 'canonical', content: process.env.HOSTNAME }] : [],
      ],
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'keyword', name: 'keyword', content: '上演時間 舞台 演劇 ミュージカル 歌舞伎 まとめ' },
        { hid: 'og:keyword', name: 'og:keyword', content: description },
      ],
    };
  }

  get state() {
    return this.getState(schedules);
  }

  get actions() {
    return this.getActions(schedules);
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/_variables";
@import "~assets/scss/schedules/_variables";

.content {
  padding-top: 10px;
  padding-left: $padding;
  padding-right: $padding;
  margin-bottom: 0px;

  section {
    padding-top: $padding;
    padding-bottom: $padding;
  }
}

@media(min-width: $desktop) {
  .content {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>