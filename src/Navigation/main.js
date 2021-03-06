import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import NewsScreen from '@Screens/NewsScreen';
import ArticleWebViewScreen from '@Screens/ArticleWebViewScreen';
import FavoritesScreen from '@Screens/FavoritesScreen';
import SettingsScreen from '@Screens/SettingsScreen';
import SettingsLanguageScreen from '@Screens/SettingsLanguageScreen';
import SettingsSourcesScreen from '@Screens/SettingsSourcesScreen';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import LoadingIndicator from '../Components/LoadingIndicator';
import Strings from '@I18n';

const {screens} = Strings;

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SettingsStackNavigator() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="SettingsHome" component={SettingsScreen} />
      <Stack.Screen name="SettingsLanguage" component={SettingsLanguageScreen} />
      <Stack.Screen name="SettingsSources" component={SettingsSourcesScreen} />
    </Stack.Navigator>
  );
}

function  NewsStackNavigator() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="NewsHome" component={NewsScreen} />
      <Stack.Screen name="ArticleWebView" component={ArticleWebViewScreen} />
    </Stack.Navigator>
  );
}

function  FavoritesStackNavigator() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="FavoritesHome" component={FavoritesScreen} />
      <Stack.Screen name="ArticleWebView" component={ArticleWebViewScreen} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === screens.news.title) {
            iconName = focused ? 'news' : 'news';
            return <EntypoIcon name={iconName} size={size} color={color} />;
          } else if (route.name === screens.favorites.title) {
            iconName = focused ? 'star' : 'staro';
            return <AntDesignIcon  name={iconName} size={size} color={color}/>;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name={screens.news.title} component={NewsStackNavigator} />
      <Tab.Screen name={screens.favorites.title} component={FavoritesStackNavigator} />
    </Tab.Navigator>
  );
}

class MainNavigation extends React.Component {
  render() {
    return (
      <>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="News">
            <Drawer.Screen
              name={screens.news.homeTitle}
              component={MainTabNavigator}
              options={{
                drawerIcon: _config => <EntypoIcon
                  size={23}
                  name={'home'} />
              }}
            />
            <Drawer.Screen
              name={screens.settings.title}
              component={SettingsStackNavigator}
              options={{
                drawerIcon: _config => <IoniconsIcon
                size={23}
                name={'ios-settings'} />
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
        <LoadingIndicator loading={this.props.loading} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
});

const mapDispatchToProps = (/*dispatch*/) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainNavigation);
