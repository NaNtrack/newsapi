import AsyncStorage from '@react-native-community/async-storage';

const Urls = {
  dev: {
    url: 'https://newsapi.org/v2/',
  },
  prod: {
    url: 'https://newsapi.org/v2/',
  },
};

const API = {
  baseUrl: Urls[__DEV__ ? 'dev' : 'prod'].url,
  timeout: 10000,
};

const DebugSettings = {
  useFixtures: false,
  yellowBox: false,
  useReduxDevTools: false,
};

const ReduxLogger = {
  // if specified this function will be called before each action is processed with this middleware.
  predicate: undefined,

  // takes a Boolean or optionally a Function that receives `getState` function for accessing current store state
  // and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
  collapsed: true,

  // print the duration of each action?
  duration: true,

  // print the timestamp with each action?
  timestamp: true,

  // console's level: 'log' | 'console' | 'warn' | 'error' | 'info'
  level: 'log',

  // colors for title, prev state, action and next state:
  // https://github.com/LogRocket/redux-logger/blob/master/src/defaults.js#L12-L18
  colors: {
    title: () => 'inherit',
    prevState: () => '#9E9E9E',
    action: () => '#03A9F4',
    nextState: () => '#4CAF50',
    error: () => '#F20404',
  },

  // Format the title used when logging actions.
  titleFormatter: undefined,

  // Transform state before print. Eg. convert Immutable object to plain JSON.
  stateTransformer: state => state,

  // Transform action before print. Eg. convert Immutable object to plain JSON.
  actionTransformer: action => action,

  // Transform error before print. Eg. convert Immutable object to plain JSON.
  errorTransformer: error => error,

  // implementation of the `console` API.
  logger: console,

  // should the logger catch, log, and re-throw errors?
  logErrors: true,

  // (alpha) show diff between states?
  diff: false,

  // (alpha) filter function for showing states diff, similar to `predicate`
  diffPredicate: undefined
};

const ReduxPersist = {
  active: true,
  reducerVersion: '1.0.0',
  rootPersistConfig: {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [],
  },
};

export default {API, DebugSettings, ReduxPersist, ReduxLogger};
