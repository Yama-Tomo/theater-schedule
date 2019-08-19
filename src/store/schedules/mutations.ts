import { MutationTree } from 'vuex';
import { State } from './state';

const mutations = {
  setInitialState: (state: State, value: State) => {
    state.schedules = value.schedules;
    state.lastUpdated = value.lastUpdated;
    state.meta = value.meta;
  },
  updateSearchWord: (state: State, value: string) => state.searchWord = value,
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const checkTypes: MutationTree<State> = mutations; // don't remove this line;

export default mutations;
