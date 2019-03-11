import { State as ScedulesState } from './schedules/state';
import { Actions as ScedulesActions } from './schedules/actions';

export const schedules = 'schedules';

export interface StateMaps {
  [schedules]: ScedulesState;
}

export interface ActionMaps {
  [schedules]: ScedulesActions;
}
