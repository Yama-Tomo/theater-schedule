<template lang="pug">
section
  .columns.is-mobile.is-multiline
    .column.is-2.desktop-title 日程
    .column.is-4.desktop-title 公演名
    .column.is-2.desktop-title 上演時間
    .column.is-4.desktop-title 当日券
    .column.is-12-mobile.mobile-title 日程 / 公演名・会場 / 上演時間 / 当日券
    .column.is-8-mobile.tablet-title 日程 / 公演名・会場 / 当日券
    .column.is-4-mobile.tablet-title 上演時間

  template(v-for="schedule in schedules" v-if="schedules.length > 0")
    ScheduleComponent(:schedule="schedule" :key="schedule.name")
    hr
  div(v-if="schedules.length == 0") 検索結果はありませんでした
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { StateTree } from '@/store/module_mapper';
import { Schedule } from '@/store/schedules';
import ScheduleComponent from '@/components/schedules/lists/schedule.vue';

@Component({
  components: {
    ScheduleComponent,
  },
})
export default class extends Vue {
  @Prop(Object) public state!: StateTree['schedules'];

  get schedules(): Schedule[] {
    if (!this.state.searchWord) {
      return this.state.schedules;
    }

    const word = this.state.searchWord.toLowerCase();
    const toFilterWord = (str: string) =>
      str.toLowerCase().replace(/\/| |・|／/g, '');

    return this.state.schedules.filter((schedule) => {
      return (
        toFilterWord(schedule.name).includes(word) ||
        toFilterWord(schedule.theater).includes(word) ||
        toFilterWord(schedule.station).includes(word) ||
        (schedule.ticketsOnTheDay &&
          toFilterWord(schedule.ticketsOnTheDay).includes(word)) ||
        schedule.actors.some((actor) => toFilterWord(actor.name).includes(word))
      );
    });
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

  background-color: #f2f3f1;
  color: $main-font-color;

  .mobile-title,
  .tablet-title {
    display: none;
  }

  .desktop-title {
    display: block;
    font-weight: 700;
  }

  hr {
    background-color: $main-font-color;
    margin-top: 5px;
    margin-bottom: 20px;

    &:last-child {
      display: none;
    }
  }
}

@media (max-width: $tablet) {
  section {
    .tablet-title {
      display: block;
      font-weight: 700;
    }

    .desktop-title,
    .mobile-title {
      display: none;
    }
  }
}

@media (max-width: 650px) {
  section {
    .mobile-title {
      display: block;
      font-weight: 700;
    }

    .desktop-title,
    .tablet-title {
      display: none;
    }
  }
}

@media (min-width: $desktop) {
  section {
    margin-left: 0px;
    margin-right: 0px;
  }
}
</style>
