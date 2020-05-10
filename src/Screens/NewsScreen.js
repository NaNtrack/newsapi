import React from 'react';
import {View, StyleSheet} from 'react-native';
import Strings from '@I18n';
import {Header, SearchBar} from 'react-native-elements';
import NewsActions from '@Redux/News';
import {connect} from 'react-redux';
import {News} from '@Components'

class NewsScreen extends React.Component {
  state = {
    search: '',
  };

  getSources = (): string => {
    const sources = this.props.selectedSources.join(',');
    console.log({sources: this.props.sources});
    return sources;
  }

  componentDidMount() {
    this.props.dispatch(NewsActions.everythingRequest({
      language: this.props.language,
      sources: this.getSources(),
    }));
  }

  onArticlePress = id => {
    this.props.dispatch(NewsActions.selectArticleRequest(id));
    this.props.navigation.navigate('ArticleDetails');
  }

  updateSearch = (search) => {
    this.setState({ search });
  }

  CustomSearchBar() {
    const { search } = this.state;
    return (
      <SearchBar
        placeholder={Strings.screens.news.searchForNews}
        onChangeText={this.updateSearch}
        value={search}
        containerStyle={{
          width: '100%',
          padding: 0,
          marginTop: -5,
          backgroundColor: 'white',
          borderWidth: 0,
        }}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: 'white',
          borderRadius: 20,
          height: 36,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 3,
        }}
        placeholderTextColor={'silver'}
        searchIcon={{
          type: 'ionicon',
          size: 20,
          name: 'ios-search',
          color: 'silver',
        }}
        inputStyle={{
          color: 'black',
        }}
      />
    );
  }

  render() {
    const { search } = this.state;
    return (
      <View style={stLocal.container}>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.props.navigation.openDrawer(),
          }}
          centerComponent={this.CustomSearchBar()}
          centerContainerStyle={{flex: 5, borderWidth: 0, backgroundColor: 'transparent', paddingHorizontal: 0}}
          rightComponent={{
            icon: 'search',
            color: '#fff',
            type: 'evil-icons',
            onPress: () => this.props.dispatch(NewsActions.everythingRequest({
              language: this.props.language,
              search
            })),
          }}
        />
        <News articles={this.props.articles} onPress={this.onArticlePress}/>
      </View>
    );
  }
}

const mapStateToProps = ({news}) => ({
  articles: news.news,
  language: news.language,
  selectedSources: news.sources.map(el => {
    return el.selected === true ? el.id : null;
  }),
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
