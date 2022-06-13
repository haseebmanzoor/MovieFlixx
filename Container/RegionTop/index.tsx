import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  FlatList,
  Image,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { REGION } from "../../API/RegionData";
type Props = {};

const Region = (props: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // Initial value for opacity: 0
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  const translate = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  });
  const scale = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 0],
  });
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: translate,
            },
          ],
        },
      ]}
    >
      <Text style={styles.text}>Region's Top</Text>
      <FlatList
        data={REGION}
        keyExtractor={(item) => item.title + Math.random()}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{}}
        renderItem={({ item, index }) => (
          <LinearGradient
            colors={["transparent", "rgba(255, 238, 99,0.1)"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={{ padding: 5, borderRadius: 10 }}
          >
            <Image
              source={{ uri: item.display_cover }}
              style={styles.img}
              resizeMode={"cover"}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.year}>{item.rating}</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.year}>{item.duration}</Text>
              <Text style={styles.year}>{item.year}</Text>
            </View>
          </LinearGradient>
        )}
      />
    </Animated.View>
  );
};

export default Region;

const styles = StyleSheet.create({
  container: {},
  text: {
    fontFamily: "PoppinsBold",
    color: "white",
    fontSize: 20,
    marginTop: 10,
    marginHorizontal: 5,
  },
  img: {
    width: 130,
    height: 200,
    borderRadius: 3,
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "white",
    marginRight: 5,
    paddingHorizontal: 2,
    marginBottom: -5,
    maxWidth: 90,
  },
  year: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "white",
    opacity: 0.6,
    paddingHorizontal: 2,
    marginBottom: -5,
  },
});
