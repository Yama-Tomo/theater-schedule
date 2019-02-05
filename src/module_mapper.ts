import { State as ScedulesState } from './store_modules/schedules/state';
import { Actions as ScedulesActions } from './store_modules/schedules/actions';

export const schedules = 'schedules';

export interface StateMaps {
  [schedules]: ScedulesState;
}

export interface ActionMaps {
  [schedules]: ScedulesActions;
}
