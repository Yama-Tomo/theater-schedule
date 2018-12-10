import { DefineActions } from 'vuex-type-helper';
import { State, initialStateResolver } from './state';
import { Mutations } from './mutations';

export interface Actions {
  fetchInitialState: void;
  updateSearchWord: string;
}

const actions: DefineActions<Actions, State, Mutations> = {
  async fetchInitialState({ commit }, args) {
    const data = process.env.isDev ? require('~/data/schedules.yml') : require( '~/data/schedules.json');

    const state = initialStateResolver(data);
    commit('setInitialState', state);
  },
  updateSearchWord: ({ commit }, args) => commit('updateSearchWord', args),
};

export default actions;
