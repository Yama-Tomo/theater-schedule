<template lang="pug">
.columns.is-mobile.is-multiline.schedule
  .column.is-2-desktop.is-12-mobile.is-2-tablet {{ date }}
  .column.is-4-desktop.is-8-mobile.is-4-tablet.second
    h2.bold.font-size-middle 『{{ name }}』
    h3.theater
       span.name.bold
         template(v-if="theaterSiteUrl")
           a(:href="theaterSiteUrl" target="_blank") {{ theater }}
         template(v-else)
           | {{ theater }}
       span.station [{{ station }}]
  .column.is-2-desktop.is-4-mobile.is-2-tablet.third
    p.bold {{ runningTime }}
    p.bold.font-size-small {{ recess }}
  .column.is-4-desktop.is-12-mobile.is-4-tablet.font-size-small
    p {{ ticketOnTheDay }}
      a(:href="ticketsOnTheDayInformationUrl" class="more" v-if="ticketsOnTheDayInformationUrl" target="_blank") 詳しくはこちら
    p(v-if="officialSiteUrl")
      a(:href="officialSiteUrl" target="_blank") 公演公式サイト
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Schedule } from '../../../store/schedules/state/schedule';

@Component
export default class extends Vue {
@Prop(Object) public schedule!: Schedule;

  get date(): string {
    const zeroPadding = (num: string) => `0${num}`.slice(-2);

    const stack = [];
    if (this.schedule.startDate) {
      stack.push(
        zeroPadding((this.schedule.startDate.getMonth() + 1).toString()) + '/' +
        zeroPadding((this.schedule.startDate.getDate()).toString()),
      );
    }

    stack.push('〜');

    if (this.schedule.endDate) {
      stack.push(
        zeroPadding((this.schedule.endDate.getMonth() + 1).toString()) + '/' +
        zeroPadding((this.schedule.endDate.getDate()).toString()),
      );
    }

    return stack.join('');
  }

  get name(): string { return this.schedule.name; }

  get theater(): string { return this.schedule.theater; }

  get station(): string { return this.schedule.station; }

  get runningTime(): string {
    return this.schedule.runningTime ? this.schedule.runningTime : '';
  }

  get recess(): string {
    return this.schedule.recess ? this.schedule.recess : '';
  }

  get ticketOnTheDay(): string {
    return this.schedule.ticketsOnTheDay ? this.schedule.ticketsOnTheDay : '';
  }

  get officialSiteUrl(): string {
    return this.schedule.officialSiteUrl ? this.schedule.officialSiteUrl : '';
  }

  get theaterSiteUrl(): string {
    return this.schedule.theaterSiteUrl ? this.schedule.theaterSiteUrl : '';
  }

  get ticketsOnTheDayInformationUrl(): string {
    return this.schedule.ticketsOnTheDayInformationUrl ? this.schedule.ticketsOnTheDayInformationUrl : '';
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/_variables";

.columns {
  h2, h3 {
    color: $main-font-color;
    font-size: inherit;
    margin-top: 0px;
    margin-bottom: 5px;
  }

  p {
    margin-bottom: 0px;
  }

  .font-size-middle {
    font-size: 1rem;
  }

  .bold {
    font-weight: 700;
  }

  .theater {
    .name {
      margin-right: 5px;
    }
  }

  .more {
    margin-left: 5px;
  }
}

@media(max-width: $tablet) {
  .column {
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
  }
}

@media(max-width: 650px) {
  .column {
    &.second, &.third {
      width: 100%;
    }
  }
}
</style>
