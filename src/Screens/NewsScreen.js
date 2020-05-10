import React from 'react';
import {View, StyleSheet} from 'react-native';
import Strings from '@I18n';
import {Header} from 'react-native-elements';
import NewsActions from '@Redux/News';
import {connect} from 'react-redux';
import {News} from '@Components'

class NewsScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(NewsActions.everythingRequest({}));
  }

  onArticlePress = id => {
    this.props.dispatch(NewsActions.selectArticleRequest(id));
    this.props.navigation.navigate('ArticleDetails');
  }

  render() {
    console.log(this.props);
    return (
      <View style={stLocal.container}>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.props.navigation.openDrawer(),
          }}
          centerComponent={{text: Strings.screens.news.title, style: {color: '#fff'}}}
          rightComponent={{
            icon: 'refresh',
            color: '#fff',
            type: 'font-awesome',
            onPress: () => this.props.dispatch(NewsActions.everythingRequest({})),
          }}
        />
        <News articles={this.props.articles} onPress={this.onArticlePress}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.news.news,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsScreen);

const stLocal = StyleSheet.create({
  container: {
    flex: 1,
  },
});
