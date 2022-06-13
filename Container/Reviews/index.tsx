import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const Reviews = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reviews</Text>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    fontFamily: "Poppins",
    margin: 15,
    fontSize: 15,
    color: "white",
    textAlign: "justify",
  },
});
