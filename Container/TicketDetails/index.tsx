import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

type Props = {};
const { width, height } = Dimensions.get("window");
const TicketDetails = ({ route }) => {
  const ticketLogo = require("../../assets/tickets.png");
  const {
    seats,
    location,
    timage,
    title,
    year,
    rating,
    writer,
    display_cover,
    overview,
    topcast,
    director,
    duration,
    tickets,
  } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={ticketLogo}
        style={{
          width: 60,
          height: 60,
          marginRight: 5,
          alignItems: "center",
          tintColor: "purple",
        }}
      />
      <Image source={display_cover} />
      <Text style={styles.text}>{location}</Text>
      <View
        style={{
          position: "absolute",
          bottom: 0,
        }}
      ></View>
    </View>
  );
};

export default TicketDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 25,
    marginTop: 50,
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "PoppinsBold",
    fontSize: 25,
    color: "white",
    margin: 10,
    marginTop: 30,
    textAlign: "center",
  },
});
