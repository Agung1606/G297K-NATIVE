import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    ActivityIndicator, 
    FlatList 
} from 'react-native'
import { Avatar, TextInput } from 'react-native-paper'
import React, { useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
// icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { 
    BottomSheetModal, 
} from '@gorhom/bottom-sheet'
import Comment from '../Comment'

import { gql, useLazyQuery } from '@apollo/client'
const GET_POST_COMMENTS = gql`
    query GetPostComments($token: String, $postId: String) {
        getPostComments(token: $token, postId: $postId) {
            _id
            userId
            username
            profilePicturePath
            comment
        }
    }
`;

export default Post = ({ item }) => {
    const [moreDesc, setMoreDesc] = useState(true);
    const handleMoreDesc = () => setMoreDesc(!moreDesc);

    const loggedInUserId = useSelector((state) => state.auth.user._id);
    const token = useSelector((state) => state.auth.token);

    const likeCount = item?.likes?.length;
    const isLiked = Boolean(item?.likes?.find(id => id === loggedInUserId));
    const longDesc = item?.description?.length > 80 ? item?.description.slice(0, 80) : item?.description;

    // comment api using apollo useLazyQuery
    const [getPostComments, { data, loading }] = useLazyQuery(GET_POST_COMMENTS);
    
    // modal
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['65%', '90%'], []);
    const openModal = async () => {
        bottomSheetModalRef.current.present();
        await getPostComments({ variables: {token: token, postId: item._id} })
    }
    const closeModal = () => {
        bottomSheetModalRef.current.dismiss();
    }

    return (
        <View className='mb-7 p-2'>
            {/* user's photo and username */}
            <View className='flex-row justify-between items-center mb-2'>
                <View className='flex-row items-center gap-x-3 px-2'>
                    <Avatar.Image 
                        size={30} 
                        source={{uri: `http://192.168.0.106:6002/assets/${item?.userProfilePicturePath}`}} 
                    />
                    <Text className='font-bold'>
                        {item?.username}
                    </Text>
                </View>
                <TouchableOpacity>
                    <MaterialIcons name='more-vert' size={25} />
                </TouchableOpacity>
                </View>
                {/* post photo */}
                <View className='mx-auto mb-2'>
                    <Image 
                        source={{ uri: `http://192.168.0.106:6002/assets/${item?.postPicturePath}` }}
                        style={{ width: 340, height: 340 }}
                        resizeMode='contain'
                    />
                </View>
                {/* icons */}
                <View className='flex-row justify-between items-center px-2 mb-2'>
                    <View className='flex-row gap-x-4'>
                        <TouchableOpacity>
                            <FontAwesome 
                                name={isLiked ? 'heart' : 'heart-o'} 
                                color={isLiked ? 'red' : undefined}
                                size={25}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openModal}>
                            <FontAwesome name='comment-o' size={25} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <FontAwesome name='bookmark-o' size={25} />
                    </TouchableOpacity>
                </View>
                {/* container */}
                <View className='px-2 space-y-1'>
                    {/* like count */}
                    {likeCount > 0 && 
                        <Text className='font-extrabold'>
                            {`${likeCount} ${likeCount > 1 ? 'likes' : 'like'}`}
                        </Text>
                    }
                    {/* username and desc */}
                    {item?.description && 
                    <Text>
                        <Text className='font-extrabold'>{item?.username}{"  "}</Text>
                        {moreDesc ? longDesc : item.description}
                    </Text>}
                    {/* function to look at long desc */}
                    {item?.description?.length > 40 && 
                    <TouchableOpacity onPress={handleMoreDesc}>
                        <Text className='text-gray-400'>{moreDesc ? '...more' : '...less'}</Text>
                    </TouchableOpacity>}
                    {/* comment info */}
                    {item?.comments > 0 && 
                    <TouchableOpacity onPress={openModal}>
                        <Text className='text-gray-400 text-[16px]'>
                            {`View all ${item.comments} ${item.comments > 1 ? 'comments' : 'comment'}`}
                        </Text>
                    </TouchableOpacity>}
                    {/* post date */}
                    <Text className='text-gray-400 text-[11px]'>
                        {dayjs(item.postDate).format("MMMM D, YYYY")}
                    </Text>
                </View>
            {/* comment modal */}
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                >
                <View className='px-2'>
                    <View 
                        className='flex-row justify-between px-3 pb-2 border-b border-gray-600'
                        >
                        <Text className='text-xl font-bold'>Comments</Text>
                        <MaterialIcons name='close' size={24} onPress={closeModal} />
                    </View>
                    <View className='pr-2 mt-2 flex-row items-center gap-x-4'>
                        <TextInput 
                            placeholder='Add a comment...'
                            underlineColor='transparent'
                            activeUnderlineColor='#3bace2'
                            className='flex-1 h-[38px] bg-gray-300'
                        />
                        <TouchableOpacity>
                            <MaterialIcons name='send' size={24} />
                        </TouchableOpacity>
                    </View>
                    {loading ? (
                        <ActivityIndicator size="large" color="#406aff" />
                        ) : (
                            <FlatList 
                                data={data?.getPostComments}
                                renderItem={({ item }) => (
                                    <View className='px-2 py-4'>
                                        <View className='flex-row gap-x-2'>
                                            <Avatar.Image 
                                                size={30} 
                                                source={{uri: `http://192.168.0.106:6002/assets/${item?.profilePicturePath}`}} 
                                            />
                                            <View>
                                                <Text className='text-[12px] text-gray-400'>
                                                    {item.username}
                                                </Text>
                                                <Text>
                                                    {item.comment}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={item => item._id}
                            />
                        )}
                </View>
            </BottomSheetModal>
            {/* comment modal */}
        </View>
    )
}