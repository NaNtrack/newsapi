import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import NewsActions from '@Redux/News';
import Strings from '@I18n';

const {screens} = Strings;

class SettingsScreen extends React.Component {
  componentDidMount() {
    const {dispatch, language, country, category} = this.props;
    dispatch(NewsActions.sourcesRequest({
      language,
    }));
  }

  onPress = (itemId) => {
    this.props.dispatch(NewsActions.toggleSelectedSourceRequest(itemId));
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => this.onPress(item.id)}>
      <ListItem
        title={item.name}
        subtitle={item.description}
        bottomDivider
        checkmark={this.props.sources.find(el => el.id === item.id).selected === true}
      />
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={stLocal.container}>
        <Header
          leftComponent={{
            icon: 'ios-arrow-back',
            type: 'ionicon',
            color: '#fff',
            onPress: () => this.props.navigation.goBack(),
          }}
          centerComponent={{text: Strings.screens.sources.title, style: {color: '#fff'}}}
        />
        <FlatList
          ListHeaderComponent={<View style={stLocal.withTopMargin}/>}
          keyExtractor={this.keyExtractor}
          data={this.props.sources}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = ({news}) => ({
  sources: news.sources,
  language: news.language,
  country: news.country,
  category: news.category
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen);

const stLocal = StyleSheet.create({
  container: {
    flex: 1,
  },
  withTopMargin: {
    height: 10,
    marginTop: 10,
  }
});
