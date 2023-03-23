import { View, Text, Pressable } from 'react-native'
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);

  const inputStyle = 'w-[95%] mx-auto mb-2 bg-indigo-50 rounded-lg';
  const formStyle = 'w-[350px] sm:w-[400px] h-auto px-3 py-5 rounded-xl mt-4 sm:bg-black/5 backdrop-blur-sm sm:border sm:border-black/30'
  return (
      <SafeAreaView className='flex-1 bg-white'>
        <View className='flex-1 flex-col sm:flex-row justify-center items-center'>
          <Text className='text-5xl font-itim text-[#2A2A72]'>
            G297K
          </Text>

          {/* FORM */}
          <View className={formStyle}>
            {/* username */}
            <View>
              <TextInput 
                placeholder='Username'
                underlineColor='transparent'
                activeUnderlineColor='#3bace2'
                className={inputStyle}
                />
            </View>

            {/* password */}
            <View>
              <TextInput 
                placeholder='Password'
                underlineColor='transparent'
                activeUnderlineColor='#3bace2'
                secureTextEntry={hidePassword}
                right={
                  <TextInput.Icon 
                  onPress={() => setHidePassword(!hidePassword)}
                  icon={hidePassword ? 'eye-off' : 'eye'}
                  />
                }
                className={inputStyle}
              />
            </View>

            {/* button submit */}
            <Pressable
              className='bg-[#3bace2] active:bg-[#229dd6] w-[95%] mx-auto mt-2 py-[10px] rounded-lg'
              onPress={() => alert('agung is a good boy')}
            >
              <Text className='text-center text-white font-semibold'>
                Login
              </Text>
            </Pressable>
          </View>
          
          <View>
            <Text className='text-blue cursor-pointer'>
              Lupa Password?
            </Text>
          </View>

          <View className='mt-10 flex-row space-x-1'>
            <Text className='text-deep-blue'>Belum punya akun?</Text>
            <Text 
              className='text-blue'
              onPress={() => navigation.navigate('FlowRegister')}
            >
              Daftar
            </Text>
          </View>

        </View>
      </SafeAreaView>
  )
}