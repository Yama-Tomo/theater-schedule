import { State as ScedulesState } from './store/schedules/state';
import { Actions as ScedulesActions } from './store/schedules/actions';

export const schedules = 'schedules';

export interface StateMaps {
  [schedules]: ScedulesState;
}

export interface ActionMaps {
 [schedules]: ScedulesActions;
}
