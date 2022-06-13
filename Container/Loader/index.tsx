import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React from "react";

type Props = {};
const { width, height } = Dimensions.get("window");
const Loader = (props: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#b41919" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: "#000",
    width,
    height,
  },
});
