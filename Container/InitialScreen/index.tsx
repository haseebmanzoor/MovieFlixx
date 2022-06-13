import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Animated,
  LogBox,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Home, RegionTop, Help, ComingSoon, MovieDetails } from "../../Container";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import firebase from "firebase";

import React, { useRef, useEffect, useState } from "react";

//! IGNORE EXPO WARNINGS
LogBox.ignoreLogs(["Setting a timer"]);
const { width, height } = Dimensions.get("window");
export default function InitialScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  const scale = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 1],
  });
  const LogoutUser = () => {
    firebase.auth().signOut();
  };
  const Logo = () => {
    return (
      <Animated.Image
        source={require("../../assets/logo.png")}
        style={[styles.image, { transform: [{ scale: scale }] }]}
        resizeMode={"contain"}
      />
    );
  };
  return (
    <FlatList
      data={[1]}
      keyExtractor={(index) => index.toString() + Math.random()}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <LinearGradient
          colors={["transparent", "transparent", "rgba(242, 76, 76,0)"]}
          start={{ x: 0.7, y: 0 }}
          //style={styles.container}
        >
          <Help />
          <Logo />
          <Home />
          <ComingSoon />
          {/* <RegionTop /> */}
          <StatusBar style="light" />
          <TouchableOpacity
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onPress={() => LogoutUser()}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/159/159707.png",
              }}
              style={{ width: 30, height: 30, tintColor: "#fff", margin: 10 }}
            />
          </TouchableOpacity>
        </LinearGradient>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    elevation: 0,
    width,
    height,
  },
  image: {
    width: 120,
    height: 80,
    alignContent: "center",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
