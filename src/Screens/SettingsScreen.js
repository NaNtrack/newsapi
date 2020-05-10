import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import {connect} from 'react-redux';
import Strings from '@I18n';

class SettingsScreen extends React.Component {
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
});
