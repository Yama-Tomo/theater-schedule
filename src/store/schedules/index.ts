import state, { State } from '@/store/schedules/state';
import actions from '@/store/schedules/actions';
import mutations from '@/store/schedules/mutations';
import * as Store from '@/types/store';

export * from '@/store/schedules/state';
export * from '@/store/schedules/state/schedule';

export { state, actions, mutations };

export interface StateTree {
  schedules: State;
}

export type RootState = Pick<StateTree, 'schedules'>;

export interface ActionTree {
  schedules: Store.DispatchArgs<typeof actions>;
}
