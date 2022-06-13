import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
} from "react-native";
import { MovieDetailsTabBar } from "../../TabNavigator";
import React, { useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import CircularProgress from "react-native-circular-progress-indicator";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  data: any;
};
const { width, height } = Dimensions.get("window");
const MovieDetails = ({ route }) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimImg = useRef(new Animated.Value(0)).current;
  const backLogo = require("../../assets/back.png");
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimImg, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimImg, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnimImg]);
  const translate = fadeAnimImg.interpolate({
    inputRange: [0, 1],
    outputRange: [50, -50],
  });

  const {
    title,
    duration,
    display_cover,
    rating,
    year,
    overview,
    director,
    writer,
    topcast,
    tickets,
  } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.fixedTop}>
        <SharedElement id={display_cover}>
          <Animated.Image
            source={{ uri: display_cover }}
            style={{
              width,
              height: 260,
              transform: [
                {
                  translateX: translate,
                },
                {
                  scale: 1.3,
                },
              ],
            }}
            resizeMode={"cover"}
            resizeMethod={"auto"}
          />
        </SharedElement>
        <LinearGradient
          colors={["rgba(0,0,0,1)", "transparent", "rgba(0,0,0,1)"]}
          style={[styles.linearGradient, { flex: 1 }]}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              marginVertical: 35,
              marginLeft: 10,
              flex: 1,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={{ alignSelf: "center" }}
              >
                <Image
                  source={backLogo}
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: "#fff",
                    marginRight: 10,
                    alignSelf: "center",
                  }}
                />
              </Pressable>
              <Text style={[styles.text]}>{title}</Text>
            </View>
            <Text style={[styles.year]}>{year}</Text>
            <View
              style={{
                position: "absolute",
                top: 245,
                left: -35,
                flexDirection: "row",
                width,
              }}
            >
              <Text style={[styles.text3]}>5k Views</Text>
              <Text style={[styles.text3]}>1.2k Likes</Text>
              <View style={{ position: "absolute", top: -50, right: -10 }}>
                <CircularProgress
                  value={rating}
                  radius={30}
                  duration={2000}
                  progressValueColor={"#ecf0f1"}
                  maxValue={10}
                  titleColor={"white"}
                  titleStyle={{
                    fontSize: 15,
                    fontFamily: "Poppins",
                  }}
                  activeStrokeColor={"darkred"}
                  inActiveStrokeColor={"transparent"}
                />
              </View>
            </View>
          </Animated.View>
        </LinearGradient>
        <StatusBar style="light" />
      </View>
      <MovieDetailsTabBar
        title={title}
        year={year}
        rating={rating}
        display_cover={display_cover}
        overview={overview}
        writer={writer}
        topcast={topcast}
        director={director}
        duration={duration}
        tickets={tickets}
      />
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  fixedTop: {
    zIndex: -999,
    position: "absolute",
    top: 0,
    width,
    height: 10,
  },
  linearGradient: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  text: {
    fontFamily: "PoppinsBold",
    color: "white",
    fontSize: 30,
    marginBottom: 0,
  },
  text3: {
    fontFamily: "PoppinsBold",
    color: "white",
    fontSize: 20,
    marginLeft: 42,
    marginTop: -8,
  },
  year: {
    fontFamily: "PoppinsBold",
    color: "white",
    fontSize: 20,
    marginLeft: 42,
    marginTop: -10,
  },
});
