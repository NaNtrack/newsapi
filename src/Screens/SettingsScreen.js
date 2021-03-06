import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import Strings from '@I18n';

const {screens} = Strings;

class SettingsScreen extends React.Component {
  settings = [
    {
      title: screens.settings.language,
      subtitle: screens.settings.languageSubtitle,
      icon: {name: 'language', type: 'entypo'},
      onPress: () => this.props.navigation.navigate('SettingsLanguage'),
    },
    {
      title: screens.settings.sources,
      subtitle: screens.settings.sourcesSubtitle,
      icon: {name: 'docs', type: 'simple-line-icon'},
      onPress: () => this.props.navigation.navigate('SettingsSources'),
    }
  ];

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => item.onPress()}>
      <ListItem
        title={item.title}
        subtitle={item.subtitle}
        leftIcon={{ name: item.icon.name, type: item.icon.type }}
        bottomDivider
        chevron
      />
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={stLocal.container}>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.props.navigation.openDrawer(),
          }}
          centerComponent={{text: Strings.screens.settings.title, style: {color: '#fff'}}}
        />
        <FlatList
          ListHeaderComponent={<View style={stLocal.withTopMargin}/>}
          keyExtractor={this.keyExtractor}
          data={this.settings}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.news.favorites,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
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
