import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import NewsActions from '@Redux/News';
import Strings from '@I18n';

const {screens} = Strings;

class SettingsScreen extends React.Component {
  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => item.onPress()}>
      <ListItem
        title={item.title}
        bottomDivider
        checkmark={item.selected}
      />
    </TouchableOpacity>
  );

  render() {
    const {language} = this.props;
    let languages = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'se', 'zh'].map(el => {
      return {
        title: screens.languages[el],
        onPress: () => this.props.dispatch(NewsActions.setLanguageRequest(el)),
        selected: language === el,
      }
    });
    languages.unshift({
      title: screens.languages.all,
      onPress: () => this.props.dispatch(NewsActions.setLanguageRequest('')),
      selected: language === '',
    })
    return (
      <View style={stLocal.container}>
        <Header
          leftComponent={{
            icon: 'ios-arrow-back',
            type: 'ionicon',
            color: '#fff',
            onPress: () => this.props.navigation.goBack(),
          }}
          centerComponent={{text: screens.languages.title, style: {color: '#fff'}}}
        />
        <FlatList
          ListHeaderComponent={<View style={stLocal.withTopMargin}/>}
          keyExtractor={this.keyExtractor}
          data={languages}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = ({news}) => ({
  language: news.language,
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
