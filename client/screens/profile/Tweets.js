import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import dayjs from 'dayjs'

import { API_URL } from '@env'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function Tweets({ item }) {
  return (
    <View className="mb-7 p-2 border-b border-gray-400">
      <View className="flex-row gap-x-4">
        <TouchableOpacity>
          <Avatar.Image
            size={55}
            source={{
              uri: `${API_URL}/assets/${item?.userProfilePicturePath}`,
            }}
          />
        </TouchableOpacity>

        <View className="flex-1">
          {/* username and date post */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-x-2">
              <Text className="font-bold text-[15px]">{item?.username}</Text>
              <Text className="text-[10px]">
                {dayjs(item.postDate).format("MMMM D, YYYY")}
              </Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="more-vert" size={22} />
            </TouchableOpacity>
          </View>
          {/* tweets */}
          <Text className="text-[14px]">
            Sejarah Indonesia meliputi suatu rentang waktu yang sangat panjang
            yang dimulai sejak zaman prasejarah berdasarkan penemuan "Manusia
            Jawa" yang berusia 1,7 juta tahun yang lalu. Periode sejarah
            Indonesia dapat dibagi menjadi lima era: Era Prakolonial, munculnya
            kerajaan-kerajaan Hindu-Buddha dan Islam di Jawa, Sumatra, dan
            Kalimantan yang terutama mengandalkan perdagangan; Era Kolonial,
            masuknya orang-orang Eropa (terutama Belanda, Portugis, dan Spanyol)
            yang menginginkan rempah-rempah mengakibatkan penjajahan oleh
            Belanda selama sekitar 3,5 abad antara awal abad ke-17 hingga
            pertengahan abad ke-20; Era Kemerdekaan Awal, pasca-Proklamasi
            Kemerdekaan Indonesia (1945) sampai jatuhnya Soekarno (1966); Era
            Orde Baru, 32 tahun masa pemerintahan Soeharto (1966–1998); serta
            Orde Reformasi yang berlangsung sampai sekarang.
          </Text>
          {/* like, comment, save */}
          <View className="mt-[10px] flex-row justify-between items-center">
            <View className='flex-row gap-x-4'>
              <TouchableOpacity>
                <FontAwesome name="heart-o" size={18} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="comment-o" size={18} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <FontAwesome name="bookmark-o" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}