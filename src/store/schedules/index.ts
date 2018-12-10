import state from './state';
import actions from './actions';
import mutations from './mutations';

const store = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default store;
