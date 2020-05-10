import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import {connect} from 'react-redux';
import NewsActions from '@Redux/News';
import {News} from '@Components'

class FavoritesScreen extends React.Component {
  onArticlePress = id => {
    this.props.dispatch(NewsActions.selectFavoriteArticleRequest(id));
    this.props.navigation.navigate('ArticleDetails');
  }

  render() {
    return (
      <View style={stLocal.container}>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.props.navigation.openDrawer(),
          }}
          centerComponent={{text: 'Favorites', style: {color: '#fff'}}}
        />
        <News articles={this.props.articles} onPress={this.onArticlePress}/>
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
)(FavoritesScreen);

const stLocal = StyleSheet.create({
  container: {
    flex: 1,
  },
});
