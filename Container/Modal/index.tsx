import {
  StyleSheet,
  Animated,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";

const { width, height } = Dimensions.get("window");
const Modal = ({ route }) => {
  const { display_cover, title, year, duration, overview } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  const translate = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  });
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["transparent", "rgba(46, 2, 73,0.8)"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={[
          {
            width,
            height,
            borderRadius: 10,
          },
        ]}
      >
        <Animated.View style={{ margin: 30, marginTop: 55 }}>
          <SharedElement id={display_cover}>
            <Image
              source={{ uri: display_cover }}
              style={{ width: 150, height: 150, borderRadius: 10 }}
              resizeMode={"contain"}
            />
          </SharedElement>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text}>{duration}</Text>
          <Text style={styles.text}>{year}</Text>
          <Animated.Text
            style={[
              styles.text,
              {
                textAlign: "justify",
                marginTop: 10,
                fontSize: 15,
                // transform: [{ translateY: translate }],
                opacity: fadeAnim,
              },
            ]}
          >
            {overview}
          </Animated.Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 20,
    color: "white",
  },
});
