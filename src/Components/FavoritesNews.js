import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Strings from '@I18n';

export default class extends React.Component {
  render() {
    return (
      <View style={stLocal.container}>
        {this.props.articles.length === 0 && (<Text>{Strings.screens.favorites.noFavorites}</Text>)}
      </View>
    );
  }
}
const stLocal = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
