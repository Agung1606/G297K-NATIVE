import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../home/HomeScreen'
import ProfileScreen from '../profile/ProfileScreen'
import { useNavigation } from '@react-navigation/native'

const Tab = createNativeStackNavigator();

export default function MainLayout() {
  const navigation = useNavigation();

  return (
    <>  
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
        <View style={styles.container}>
            <View style={styles.child}>
              <Text onPress={() => navigation.navigate('Home')}>
                Home
              </Text>
              <Text onPress={() => navigation.navigate('Profile')}>
                Profile
              </Text>
            </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  child: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});