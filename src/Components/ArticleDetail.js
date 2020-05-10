import React from 'react';
import {View, ScrollView, ActivityIndicator, Linking, StyleSheet} from 'react-native';
import {Image, Text} from 'react-native-elements';
import Strings from '@I18n';

export default class extends React.Component {
  render() {
    const {article, onVisitWebsite} = this.props;
    return (
      <ScrollView style={stLocal.container}>
        <Image
          source={{ uri: article.urlToImage }}
          style={stLocal.image}
          PlaceholderContent={<ActivityIndicator />}
          placeholderStyle={stLocal.imageContainerStyle}
        />
        <View style={stLocal.textContainer}>
          <Text h4>{article.title}</Text>
          <Text>{Strings.screens.articleDetails.source} {article.source.name}</Text>
          <Text style={stLocal.description}>{article.description}</Text>
          <Text style={stLocal.description}>{article.content}</Text>
          <Text style={stLocal.link} onPress={() => onVisitWebsite()}>Visit Website &gt;</Text>
        </View>
      </ScrollView>
    );
  }
}
const stLocal = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    height: 300,
    width: '100%',
    marginBottom: 10,
  },
  imageContainerStyle: {
    backgroundColor: '#fff',
  },
  textContainer: {
    padding: 10
  },
  description: {
    marginTop: 10,
    textAlign: 'justify',
  },
  link: {
    marginTop: 10,
    marginBottom: 20,
    color:'blue',
  }
});
