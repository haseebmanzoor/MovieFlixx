import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import TextTicker from "react-native-text-ticker";
import firebase from "firebase";
const { width, height } = Dimensions.get("window");
type Props = {};

const Help = (props: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [firebaseData, setfirebaseData] = useState([]);

  const getComing = async () => {
    const snapshot = await firebase.firestore().collection("ticker").get();
    const data = snapshot.docs.map((doc) => doc.data());
    setfirebaseData(data);
  };
  useEffect(() => {
    getComing();
    console.log(firebaseData);
  }, []);
  useEffect(() => {
    //firebaseData.length > 0 ? setLoaded(true) : setLoaded(false);
    console.log(firebaseData);
  }, [firebaseData]);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  const translate = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  return (
    <Animated.View
      style={{ opacity: fadeAnim, zIndex: 999, elevation: 50, top: 55 }}
    >
      <TextTicker
        style={{ fontSize: 12, color: "white", fontFamily: "Poppins" }}
        duration={12000}
        loop
        bounce
        repeatSpacer={100}
        marqueeDelay={2000}
      >
        {firebaseData[0]?.header}
      </TextTicker>
    </Animated.View>
  );
};

export default Help;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins",
    color: "white",
    padding: 5,
    fontSize: 15,
  },
});
