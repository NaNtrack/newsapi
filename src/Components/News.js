import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import Strings from '@I18n';

export default class extends React.Component {
  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => this.props.onPress(index)}>
      <ListItem
        title={item.title}
        subtitle={item.source ? item.source.name : ''}
        bottomDivider
        chevron
      />
    </TouchableOpacity>
  );

  render() {
    const {articles} = this.props;
    return (
      <View style={stLocal.container}>
        {articles.length === 0 && (
          <Text style={stLocal.noElements}>{Strings.noItems}</Text>
        )}
        <FlatList
          keyExtractor={this.keyExtractor}
          data={articles}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const stLocal = StyleSheet.create({
  container: {
    flex: 1,
  },
  noElements: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 20,
    alignSelf: 'center',
  }
});
