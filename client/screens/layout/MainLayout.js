import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../home/HomeScreen'
import ProfileScreen from '../profile/ProfileScreen'
import ExploreScreen from '../explore/ExploreScreen'

// ICONS
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const Tab = createBottomTabNavigator();

export default function MainLayout() {

  return (
    <Tab.Navigator 
      initialRouteName='Home'
      screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#010026',
        tabBarStyle: { height: '8%' },
      }}
    >
      <Tab.Screen 
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name='home' color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen 
        name='Explore'
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name='search' color={color} size={30} />
          )
        }}
      />
      <Tab.Screen 
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='account-circle' color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}