import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import React, { useState, memo } from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
// icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default Post = memo(function Post({ item }) {
    const [moreDesc, setMoreDesc] = useState(true);
    const handleMoreDesc = () => setMoreDesc(!moreDesc);

    const user = useSelector((state) => state.auth.user);

    const likeCount = Object.keys(item?.likes).length || 0;
    const isLiked = Boolean(item?.likes[user._id]);
    const longDesc = item?.description?.length > 80 ? item.description.slice(0, 80) : item.description;
    const commentCount = item?.comments?.length;

    return (
        <View className='mb-7 p-2'>
            {/* user's photo and username */}
            <View className='flex-row justify-between items-center mb-2'>
                <View className='flex-row items-center gap-x-3 px-2'>
                    <Avatar.Image 
                        size={30} 
                        source={{uri: `http://192.168.0.106:6002/assets/${item.userProfilePicturePath}`}} 
                    />
                    <Text className='font-bold'>
                        {item.username}
                    </Text>
                </View>
                <TouchableOpacity>
                    <MaterialIcons name='more-vert' size={25} />
                </TouchableOpacity>
            </View>
            {/* post photo */}
            <View className='mx-auto mb-2'>
                <Image 
                    source={{ uri: `http://192.168.0.106:6002/assets/${item.postPicturePath}` }}
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
                    <TouchableOpacity>
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
                    <Text className='font-extrabold'>{item.username}{"  "}</Text>
                    {moreDesc ? longDesc : item.description}
                </Text>}
                {/* function to look at long desc */}
                {item?.description?.length > 40 && 
                <TouchableOpacity onPress={handleMoreDesc}>
                    <Text className='text-gray-400'>{moreDesc ? '...more' : '...less'}</Text>
                </TouchableOpacity>}
                {/* comment info */}
                {item.comments?.length > 0 && 
                    <Text className='text-gray-400 text-[16px]'>
                        {`View all ${commentCount} ${commentCount > 1 ? 'comments' : 'comment'}`}
                    </Text>}
                {/* post date */}
                <Text className='text-gray-400 text-[12px]'>
                    {dayjs(item.postDate).format("MMMM D, YYYY")}
                </Text>
            </View>
        </View>
    )
})