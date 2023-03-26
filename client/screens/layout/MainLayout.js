import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../home/HomeScreen'
import ProfileScreen from '../profile/ProfileScreen'

// ICONS
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const Tab = createBottomTabNavigator();

export default function MainLayout() {

  return (
    <Tab.Navigator screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#010026',
      }}
    >
      <Tab.Screen 
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='account-circle' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}