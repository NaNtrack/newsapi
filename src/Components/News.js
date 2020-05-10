import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';

export default class extends React.Component {
  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => this.props.onPress(index)}>
      <ListItem
        title={item.title}
        subtitle={item.source.name}
        bottomDivider
        chevron
      />
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={stLocal.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.props.articles}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const stLocal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
