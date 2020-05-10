import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Progress from 'react-native-progress';

export default class extends React.Component {
  render() {
    return (
      <View style={stLocal.container}>
        <Progress.Bar indeterminate={true} width={200} color={'#000'} />
      </View>
    );
  }
}

const stLocal = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
});
