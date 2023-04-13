import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
} from 'react-native'
import { Avatar } from 'react-native-paper'
import React, { useMemo, useRef, useState, memo } from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
// icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { TapGestureHandler } from 'react-native-gesture-handler'
import LikeAnimation from '../animation/LikeAnimation'
import Animated, {
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { 
    BottomSheetModal, 
} from '@gorhom/bottom-sheet'
// comment component
import ModalCommentPost from '../modal/ModalCommentPost'
import { useNavigation } from '@react-navigation/native'

import { API_URL } from '@env';

import { gql, useMutation } from '@apollo/client'

const LIKE_POST = gql`
  mutation LikePost($token: String, $postId: String, $userId: String) {
    likePost(token: $token, postId: $postId, userId: $userId) {
      _id
      likes
    }
  }
`;

const Post = ({ item }) => {
    const navigation = useNavigation();
    const goToProfile = () => navigation.navigate('ProfileScreen', {param: item.userId});

    const [moreDesc, setMoreDesc] = useState(false);
    const handleMoreDesc = () => setMoreDesc(true);

    const loggedInUserId = useSelector((state) => state.auth.user._id);
    const token = useSelector((state) => state.auth.token);

    // post config
    const isLiked = Boolean(item?.likes.find(id => id === loggedInUserId));
    const likeCount = Number(item?.likes.length);
    const longDesc = item?.description.length > 80 && !moreDesc ? item?.description.slice(0, 80) : item?.description;
    const sourceImageProfile = {
      uri: `${API_URL}/assets/${item?.userProfilePicturePath}`,
    };
    const sourceImagePost = {
      uri: `${API_URL}/assets/${item?.postPicturePath}`,
    };
    
    // modal
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['65%', '90%'], []);
    const openModal = () => {
      bottomSheetModalRef.current.present();
    }
    const closeModal = () => bottomSheetModalRef.current.dismiss();

    // like animation config
    const [likePost, { data, loading: loadingLike }] = useMutation(LIKE_POST);
    const liked = useSharedValue(isLiked ? 1 : 0);

    const handleLiked = async () => {
      await likePost({
        variables: {
          token: token,
          postId: item._id,
          userId: loggedInUserId,
        },
      });
      liked.value = withSpring(liked.value ? 0 : 1);
    };
    
    return (
      <View className="mb-7 p-2">
        {/* user's photo and username */}
        <View className="flex-row justify-between items-center mb-2">
          <TouchableOpacity onPress={goToProfile}>
            <View className="flex-row items-center gap-x-3 px-2">
              <Avatar.Image size={30} source={sourceImageProfile} />
              <Text className="font-bold">{item?.username}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={25} />
          </TouchableOpacity>
        </View>
        {/* post photo */}
        <View className="relative mx-auto mb-2">
          <TapGestureHandler numberOfTaps={2} onActivated={handleLiked}>
            <Image
              source={sourceImagePost}
              style={{ width: 340, height: 340 }}
              resizeMode="contain"
            />
          </TapGestureHandler>
          {/* love animation when liked */}
          {loadingLike && (
            <View className="absolute top-[40%] left-[40%]">
              <Animated.View>
                <FontAwesome name="heart" size={80} />
              </Animated.View>
            </View>
          )}
        </View>
        {/* icons */}
        <View className="flex-row justify-between items-center px-2 mb-2">
          <View className="flex-row gap-x-4">
            <TouchableOpacity onPress={handleLiked}>
              <LikeAnimation color="#fff" size={25} liked={liked} />
            </TouchableOpacity>

            <TouchableOpacity onPress={openModal}>
              <FontAwesome name="comment-o" size={25} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="ios-share" size={25} />
          </TouchableOpacity>
        </View>
        {/* container */}
        <View className="px-2 space-y-1">
          {/* like count */}
          {likeCount > 0 && (
            <Text className="font-extrabold">
              {`${likeCount} ${likeCount > 1 ? "likes" : "like"}`}
            </Text>
          )}
          {/* username and desc */}
          {item?.description && (
            <Text>
              <Text onPress={goToProfile} className="font-extrabold">
                {item?.username}
              </Text>{" "}
              <Text>
                {longDesc} {""}
                {item?.description?.length > 40 && !moreDesc && (
                  <Text
                    className="text-[16px] text-gray-400"
                    onPress={handleMoreDesc}
                  >
                    ...more
                  </Text>
                )}
              </Text>
            </Text>
          )}
          {/* comment info */}
          {item?.comments > 0 && (
            <TouchableOpacity onPress={openModal}>
              <Text className="text-gray-400 text-[16px]">
                {`View all ${item.comments} ${
                  item.comments > 1 ? "comments" : "comment"
                }`}
              </Text>
            </TouchableOpacity>
          )}
          {/* post date */}
          <Text className="text-gray-400 text-[11px]">
            {dayjs(item.postDate).format("MMMM D, YYYY")}
          </Text>
        </View>
        {/* comment modal */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <ModalCommentPost
            onPress={closeModal}
            postId={item._id}
            commentCount={item.comments}
          />
        </BottomSheetModal>
        {/* comment modal */}
      </View>
    );
}

export default memo(Post);