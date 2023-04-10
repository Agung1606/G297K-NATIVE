import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import Post from '../../components/widgets/Post';

// icons
import { AntDesign } from '@expo/vector-icons';

// api
import { useQuery, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
const GET_POST = gql`
    query GetPost($token: String, $postId: String) {
        getPost(token: $token, postId: $postId) {
            _id
            userId
            username
            postDate
            postPicturePath
            userProfilePicturePath
            description
            likes
            comments
        }
    }
`;

function PostScreen({ route }) {
    const navigation = useNavigation();
    const { postId } = route?.params;
    const token = useSelector((state) => state.auth.token);

    const goToPreviousScreen = () => navigation.goBack();

    const {data: postData, loading: postLoading} = useQuery(GET_POST, {
        variables: {
            token: token,
            postId: postId
        }
    });

    if(postLoading) {
        return (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#406aff" />
          </View>
        );
    }

    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="my-5 mx-3 flex-row items-center">
          <TouchableOpacity onPress={goToPreviousScreen}>
            <AntDesign name="arrowleft" size={30} />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-[22px] font-bold">
            Post
          </Text>
        </View>
        <ScrollView>
          <Post item={postData?.getPost} />
        </ScrollView>
      </SafeAreaView>
    );
}
export default memo(PostScreen);