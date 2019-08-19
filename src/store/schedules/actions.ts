import { ActionTree } from 'vuex';
import { initialStateResolver, State } from './state';
import mutations from './mutations';
import { ActionContext } from '@/types/store';
import { RootState } from '@/store/module_mapper';

type Context = ActionContext<State, typeof mutations, RootState>;

const actions = {
  async fetchInitialState(ctx: Context) {
    const data = process.env.isDev ? require('~/data/schedules.yml') : require( '~/data/schedules.json');
    ctx.commit('setInitialState', initialStateResolver(data));
  },
  updateSearchWord: (ctx: Context, args: string) => ctx.commit('updateSearchWord', args),
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const checkTypes: ActionTree<State, RootState> = actions; // don't remove this line;

export default actions;
