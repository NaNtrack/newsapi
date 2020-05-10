import {createActions, createReducer} from 'reduxsauce';
import {NewsService} from "../Services";

export const INITIAL_STATE = {
  initialized: false,
  loading: false,
};

/* ------------- Types and Action Creators ------------- */
export const {Types, Creators} = createActions({
  init: null,
  setLoading: ['value'],
});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.INIT]: (state, action) => {
    return {
      ...state,
      initialized: true,
    };
  },
  [Types.SET_LOADING]: (state, action) => {
    return {
      ...state,
      loading: action.value,
    };
  },
});

/* ------------- Thunks actions ------------- */
const setLoading = loading => {
  return dispatch => {
    dispatch(Creators.setLoading(loading));
  };
};

const init = () => {
  return dispatch => {
    dispatch(Creators.init());
  };
};

export default {
  init,
  setLoading,
};
