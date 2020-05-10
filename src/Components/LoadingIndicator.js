import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

export default class extends React.Component {
  render() {
    if (this.props.loading) {
      return (
        <View style={stLocal.container}>
          <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
      );
    }

    return null;
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
