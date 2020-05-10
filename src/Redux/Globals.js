import {createActions, createReducer} from 'reduxsauce';
import {set, cloneDeep} from 'lodash';
import is from 'is_js';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {};

/* ------------- Types and Action Creators ------------- */
export const {Types, Creators} = createActions({
  changeState: ['module', 'property', 'value'],
});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STATE]: (state, action) => {
    const newState = cloneDeep(state);

    // Only update the state if it's the same Module
    if (
      !is.undefined(action.module) &&
      !is.undefined(newState[action.module])
    ) {
      // Update value
      set(newState[action.module], action.property, action.value);
    }

    return newState;
  },
});

export default Creators;
