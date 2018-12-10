import Vuex from 'vuex';
import { schedules } from '~/module_mapper';
import schedulesStore from './schedules/';

export default () => {
  return new Vuex.Store({
    modules: {
      [schedules]: schedulesStore,
    },
  });
};
