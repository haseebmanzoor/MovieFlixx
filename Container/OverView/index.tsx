import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  overview: any;
  writer: any;
  topcast: any;
  director: any;
  duration: any;
};

const OverView = (props: Props) => {
  const { overview, writer, topcast, director, duration } = props;
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            fontSize: 18,
            textAlign: "left",
            padding: 10,
            backgroundColor: "rgba(128,128,128,0.2)",
            borderRadius: 5,
          },
        ]}
      >
        {overview}
      </Text>
      <Text
        style={[styles.text, { fontFamily: "PoppinsBold", marginVertical: 0 }]}
      >
        DIRECTOR
      </Text>
      <Text style={[styles.text, { marginVertical: 0, marginBottom: 10 }]}>
        {director}
      </Text>
      <Text
        style={[styles.text, { fontFamily: "PoppinsBold", marginVertical: 0 }]}
      >
        WRITER
      </Text>
      <Text style={[styles.text, { marginVertical: 0, marginBottom: 10 }]}>
        {writer}
      </Text>
      <Text
        style={[styles.text, { fontFamily: "PoppinsBold", marginVertical: 0 }]}
      >
        TOP CAST
      </Text>
      <Text style={[styles.text, { marginVertical: 0, marginBottom: 10 }]}>
        {topcast}
      </Text>
      <Text
        style={[styles.text, { fontFamily: "PoppinsBold", marginVertical: 0 }]}
      >
        DURATION
      </Text>
      <Text style={[styles.text, { marginVertical: 0, marginBottom: 10 }]}>
        {duration}
      </Text>
    </View>
  );
};

export default OverView;

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
