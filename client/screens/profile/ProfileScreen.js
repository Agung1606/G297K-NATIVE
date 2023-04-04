import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../state/authSlice';

// api
import { useQuery, gql } from '@apollo/client';
const GET_USER = gql`
  query GetUser($token: String, $userId: String) {
    getUser(token: $token, userId: $userId) {
      _id
      firstName
      lastName
      username
      profilePicturePath
      bio
      followers
      following
    }
  }
`;

export default function ProfileScreen({ route }) {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(setLogout());

  const userId = route?.params?.param;
  const token = useSelector((state) => state.auth.token);
  // data
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      token: token,
      userId: userId
    }
  });
  
  return (
    <SafeAreaView>
      
    </SafeAreaView>
  )
}