import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ConectPage from '../pages/ConectPage/ConectPage';
import { FreestylerContext } from '../context';
import Home from '../pages/Home/Home';
import Playbacks from '../pages/Playbacks/Playbacks';
import { PlayIcon } from 'native-base';
import Overrides from '../pages/Overrides/Overrides';
import Icon from 'react-native-vector-icons/AntDesign'
import IonicIcon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: {
            backgroundColor: '#0f172a',
        }
    }}>
      <Tab.Screen 
        name="Home" 
        component={Home}  
        options={{
            tabBarIcon: ({ focused }) => <IonicIcon name='home'  color={focused ? '#fff' : '#888'} size={20} />,
            tabBarLabelStyle: { fontSize: 15 },
            tabBarInactiveTintColor: '#888',
            tabBarActiveTintColor: '#fff',

        }}
      />
      <Tab.Screen name="Playbacks" component={Playbacks} options={{
        tabBarIcon: ({ focused }) => <Icon name='play'  color={focused ? '#fff' : '#888'} size={20} />,
        tabBarLabelStyle: { fontSize: 15 },
        tabBarInactiveTintColor: '#888',
        tabBarActiveTintColor: '#fff',
       
      }}  />
        <Tab.Screen name="Overrides" component={Overrides} options={{
        tabBarIcon: ({ focused }) => <IonicIcon  name={focused ? 'ios-grid' : 'ios-grid-outline'} size={20} color={focused ? '#fff' : '#888'} />,
        tabBarLabelStyle: { fontSize: 15 },
        tabBarInactiveTintColor: '#888',
        tabBarActiveTintColor: '#fff',
    
       
      }}  />

      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

const Routes = () => {
    const { socket } = useContext(FreestylerContext);
    return <NavigationContainer >
        {socket ? (
          <MyTabs />
        ) : (
          <ConectPage />
        )}
    </NavigationContainer>
}

export default Routes;