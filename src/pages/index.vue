<template lang="pug">
.content
  Overview
  .time updated:
    time {{ today }}
  Search(:actions="actions")
  Lists(:state="state")
  Twitter(:twitter-embedded-url="twitterEmbeddedUrl" v-if="twitterEmbeddedUrl")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import * as StoreHelper from '@/store/helper';
import { Nuxt } from '@/types/nuxt';
import Overview from '@/components/schedules/overview.vue';
import Search from '@/components/schedules/search.vue';
import Lists from '@/components/schedules/lists.vue';
import Twitter from '@/components/schedules/twitter.vue';

@Component({
  components: {
    Overview,
    Search,
    Lists,
    Twitter,
  },
})
export default class extends Vue {
  public fetch(ctx: Nuxt.Context) {
    const actions = StoreHelper.getActions('schedules', ctx.store);
    actions.fetchInitialState();
  }

  public head() {
    const description = this.state.meta.description;

    return {
      link: [
        ...(process.env.HOSTNAME
          ? [
              {
                hid: 'canonical',
                name: 'canonical',
                content: process.env.HOSTNAME,
              },
            ]
          : []),
      ],
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'keyword', name: 'keyword', content: this.state.meta.keyword },
        { hid: 'og:keyword', name: 'og:keyword', content: description },
      ],
    };
  }

  get twitterEmbeddedUrl(): string | undefined {
    return process.env.twitterEmbeddedUrl;
  }

  get today(): string {
    const zeroPadding = (num: number) => `0${num.toString()}`.slice(-2);
    const date = this.state.lastUpdated;

    return [
      date.getFullYear(),
      zeroPadding(date.getMonth() + 1),
      zeroPadding(date.getDate()),
    ].join('.');
  }

  get state() {
    return StoreHelper.getState('schedules', this.$store);
  }

  get actions() {
    return StoreHelper.getActions('schedules', this.$store);
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/_variables';
@import '~assets/scss/schedules/_variables';

.content {
  padding-top: 10px;
  padding-left: $padding;
  padding-right: $padding;
  margin-bottom: 0px;

  section {
    padding-top: $padding;
    padding-bottom: $padding;
  }

  .time {
    color: $main-font-color;
    text-align: right;
    time {
      padding-left: 5px;
    }
  }
}

@media (min-width: $desktop) {
  .content {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
