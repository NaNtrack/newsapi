import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistReducer} from 'redux-persist';
import {reducer as GlobalsReducer} from '@Redux/Globals';
import {reducer as AppReducer} from '@Redux/App';
import {reducer as NewsReducer} from '@Redux/News';
import Config from '@Config';
import RehydrationServices from '@Redux/RehydrationService';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const mainReducer = combineReducers({
    app: AppReducer,
    news: NewsReducer,
  });

  const rootReducer = (state, action) => {
    const newState = GlobalsReducer(state, action);
    return mainReducer(newState, action);
  };

  const persistentReducer = persistReducer(
    Config.ReduxPersist.rootPersistConfig,
    rootReducer,
  );

  const reduxLogger = createLogger(Config.ReduxLogger);

  const middleware = [reduxLogger, reduxThunk];

  const store = createStore(
    persistentReducer,
    {},
    applyMiddleware(...middleware),
  );

  if (Config.ReduxPersist.active)
    RehydrationServices(store);

  return store;
};
