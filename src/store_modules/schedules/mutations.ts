import { DefineMutations } from 'vuex-type-helper';
import { State } from './state';

export interface Mutations {
  setInitialState: State;
  updateSearchWord: string;
}

const mutations: DefineMutations<Mutations, State> = {
  setInitialState: (state, value) => {
    state.schedules = value.schedules;
    state.lastUpdated = value.lastUpdated;
    state.meta = value.meta;
  },
  updateSearchWord: (state, value) => state.searchWord = value,
};

export default mutations;
