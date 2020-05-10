import React from 'react';
import 'react-native-gesture-handler';
import Navigation from './Navigation';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import createStore from '@Redux';

const mainStore = createStore();
const persistentStore = persistStore(mainStore);

export default class extends React.Component {
  render() {
    return (
      <Provider store={mainStore}>
        <PersistGate persistor={persistentStore}>
          <View style={stLocal.mainContainer}>
            <Navigation />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const stLocal = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
