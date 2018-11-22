import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Icon from '@expo/vector-icons/Feather';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Splash from './screens/Splash';
import Profile from './screens/Profile';
import { color } from './libs/metrics';
import PostDetail from './screens/PostDetail';
import Chat from './screens/Chat';
import ChatDetail from './screens/ChatDetail';
import AddPost from './screens/AddPost';
import Friend from './screens/Friend';
import AddFriend from './screens/AddFriend';
import FriendProfile from './screens/FriendProfile';

const AuthNavigation = createStackNavigator(
  {
    Login: Login,
    Register: Register
  },
  {
    headerMode: 'none',
    cardStyle: {
      paddingTop: 25
    }
  }
);

const MainTabNavigation = createBottomTabNavigator(
  {
    Home: Home,
    Chat: Chat,
    Friend: Friend,
    Profile: Profile
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Chat':
            iconName = 'message-circle';
            break;
          case 'Friend':
            iconName = 'at-sign';
            break;
          case 'Profile':
            iconName = 'user';
            break;
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: color.primary
    }
  }
);

const MainStackNavigation = createStackNavigator(
  {
    Tab: MainTabNavigation,
    PostDetail: PostDetail,
    ChatDetail: ChatDetail,
    AddPost: AddPost,
    AddFriend: AddFriend,
    FriendProfile: FriendProfile
  },
  {
    headerMode: 'none',
    cardStyle: {
      paddingTop: 25
    }
  }
);

export default createSwitchNavigator({
  Splash: Splash,
  Auth: AuthNavigation,
  Main: MainStackNavigation
});
