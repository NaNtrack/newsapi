import React from 'react';
import {View, ActivityIndicator, Linking, StyleSheet} from 'react-native';
import {Image, Text} from 'react-native-elements';
import Strings from '@I18n';

export default class extends React.Component {
  openLink = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }

  render() {
    const {article} = this.props;
    return (
      <View style={stLocal.container}>
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
          <Text style={stLocal.link} onPress={() => this.openLink(article.url)}>Visit Website &gt;</Text>
        </View>
      </View>
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
