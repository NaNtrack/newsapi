import AsyncStorage from '@react-native-community/async-storage';
import {persistStore} from 'redux-persist';
import Config from '../Config';
import AppActions from './App';

export default store => {
  const reducerVersion = Config.ReduxPersist.reducerVersion;
  const init = () => store.dispatch(AppActions.init());

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion')
    .then(localVersion => {
      console.log('local reducerVersion: ' + localVersion);
      if (localVersion !== reducerVersion) {
        console.log('reducerVersion changes to: ' + reducerVersion);
        // Purge store
        persistStore(store, null, init)
          .purge()
          .then(() => console.log('Store purged'));
        AsyncStorage.setItem('reducerVersion', reducerVersion);
      } else {
        persistStore(store, null, init);
      }
    })
    .catch(() => {
      persistStore(store, null, init);
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    });
};
