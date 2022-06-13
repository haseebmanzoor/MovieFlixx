import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import * as Haptics from "expo-haptics";
import { HOME_TOP } from "../../API/HomeData";
import { HomeShimmer } from "../../Shimmers";
type Props = {};

const ComingSoon = (props: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  // Initial value for opacity: 0
  const [firebaseData, setfirebaseData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const getComing = async () => {
    const snapshot = await firebase.firestore().collection("comingsoon").get();
    const data = snapshot.docs.map((doc) => doc.data());
    setfirebaseData(data);
  };
  useEffect(() => {
    getComing();
    console.log(firebaseData);
  }, []);
  useEffect(() => {
    firebaseData.length > 0 ? setLoaded(true) : setLoaded(false);
    console.log(firebaseData);
  }, [firebaseData]);
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
  return isLoaded ? (
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
      <LinearGradient
        colors={["transparent", "rgba(46, 2, 73,1)"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{ backgroundColor: "red" }}
      >
        <Text style={styles.text}>Coming Soon</Text>
        <FlatList
          data={firebaseData}
          keyExtractor={(item) => item.title + Math.random()}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
          renderItem={({ item, index }) => (
            <View style={{ padding: 5 }}>
              <TouchableOpacity
                onLongPress={() => {
                  navigation.navigate("Modal", {
                    title: item.title,
                    year: item.year,
                    rating: item.rating,
                    display_cover: item.display_cover,
                    duration: item.duration,
                    overview: item.overview,
                  });
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                onPressOut={() => navigation.goBack()}
                activeOpacity={1}
              >
                <SharedElement id={item.display_cover}>
                  <Image
                    source={{ uri: item.display_cover }}
                    style={styles.img}
                    resizeMode={"contain"}
                  />
                </SharedElement>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Text style={[styles.title]} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </View>
          )}
        />
      </LinearGradient>
    </Animated.View>
  ) : (
    <View style={{ marginTop: 70 }}>
      <HomeShimmer />
    </View>
  );
};

export default ComingSoon;
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
    height: 130,
    borderRadius: 3,
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 13,
    color: "white",
    marginRight: 5,
    paddingHorizontal: 2,
    marginBottom: -5,
    minWidth: 100,
    maxWidth: 100,
    opacity: 0.9,
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
