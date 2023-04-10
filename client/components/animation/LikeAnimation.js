import { StyleSheet } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";

export default function LikeAnimation({ liked }) {
  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: liked.value }],
      opacity: liked.value,
    };
  });

  return (
    <>
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        <FontAwesome name="heart-o" size={25} />
      </Animated.View>

      <Animated.View style={fillStyle}>
        <FontAwesome name="heart" size={25} color="red" />
      </Animated.View>
    </>
  );
}
