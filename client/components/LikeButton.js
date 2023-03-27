import { Pressable, View } from 'react-native'
import React from 'react'
import Animated, { 
    useSharedValue, 
    withSpring,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated'
// icons
import FontAwesome from '@expo/vector-icons/FontAwesome';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function LikeButton() {
    const liked = useSharedValue(0);

    const outlineStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP) }]
        }
    });

    const fillStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: liked.value }],
        };
    });

    const handleLike = () => {
        liked.value = withSpring(liked.value ? 0 : 1)
    };

    return (
        <Pressable onPress={handleLike}>
            <AnimatedView style={outlineStyle}>
                <FontAwesome name='heart-o' size={25} />
            </AnimatedView>

            <AnimatedView style={fillStyle}>
                <FontAwesome name='heart' size={25} color='red' />
            </AnimatedView>
        </Pressable>
    );
}