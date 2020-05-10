import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Header} from 'react-native-elements';
import {ArticleDetail} from '@Components'
import NewsActions from '@Redux/News';

class ArticleDetailScreen extends React.Component {
  toggleFavorite = () => {
    this.props.dispatch(NewsActions.toggleFavoriteRequest());
  }

  render() {
    const {starred, selectedArticle} = this.props

    return (
      <View style={stLocal.container}>
        <Header
          leftComponent={{
            icon: 'ios-arrow-back',
            type: 'ionicon',
            color: '#fff',
            onPress: () => this.props.navigation.goBack(),
          }}
          centerComponent={{text: selectedArticle.source.name, style: {color: '#fff'}}}
          rightComponent={{
            icon: 'star',
            type: 'antdesign',
            color: starred ? '#ffff00' : '#fff',
            onPress: () => this.toggleFavorite(),
          }}
        />
        <ArticleDetail article={this.props.selectedArticle}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  selectedArticle: state.news.selectedArticle,
  starred: state.news.selectedArticle.starred ? true: false,
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleDetailScreen);

const stLocal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});
