import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// register
import EmailReg from './reg/EmailReg';
import NameReg from './reg/NameReg';
import BirthdayReg from './reg/BirthdayReg';
import UsernameReg from './reg/UsernameReg';
import PasswordReg from './reg/PasswordReg';

const Tab = createNativeStackNavigator();

export default function FlowRegister() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name='EmailReg' component={EmailReg} />
        <Tab.Screen name='NameReg' component={NameReg} />
        <Tab.Screen name='BirthdayReg' component={BirthdayReg} />
        <Tab.Screen name='PasswordReg' component={PasswordReg} />
        <Tab.Screen name='UsernameReg' component={UsernameReg} />
    </Tab.Navigator>
  )
}