import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";

type Props = {
  title: any;
  year: any;
  display_cover: any;
  rating: any;
  overview: any;
  writer: any;
  topcast: any;
  director: any;
  duration: any;
  tickets: [];
};

const Tickets = (props: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { tickets } = props;
  const seatLogo = require("../../assets/seat.png");
  const ticketLogo = require("../../assets/tickets.png");
  const popCorn = require("../../assets/popcorn.png");
  const threeD = require("../../assets/3d.png");
  const [showSeats, setSeats] = useState(0);
  const [selectedSeat, setselectedSeat] = useState("");

  useEffect(() => {}, [showSeats]);
  useEffect(() => {}, [selectedSeat]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, showSeats]);
  return (
    <FlatList
      data={tickets}
      keyExtractor={(index) => index + Math.random().toString()}
      style={{ backgroundColor: "black" }}
      renderItem={({ index, item }) => (
        <View style={styles.card}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setSeats(index);
              setselectedSeat("");
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={ticketLogo}
                style={{
                  width: 40,
                  height: 40,
                  margin: 20,
                  marginRight: 5,
                  alignItems: "center",
                  tintColor: "purple",
                }}
              />
              <View>
                <Text style={styles.text}>{item.location}</Text>
                <Text style={styles.text2}>{item.time}</Text>
                <Text style={[styles.text2, { opacity: 0.5 }]}>
                  {item.city}
                </Text>
              </View>

              <Image
                source={popCorn}
                style={{
                  width: 20,
                  height: 20,
                  alignItems: "center",
                  tintColor: item.isRefreshment ? "coral" : "gray",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  margin: 10,
                }}
              />
              <Image
                source={threeD}
                style={{
                  width: 20,
                  height: 20,
                  alignItems: "center",
                  tintColor: item.isThreeD ? "coral" : "gray",
                  position: "absolute",
                  bottom: 0,
                  right: 30,
                  margin: 10,
                }}
              />
            </View>
          </TouchableOpacity>

          {showSeats === index && (
            <Animated.View style={[styles.seats, { opacity: fadeAnim }]}>
              {item?.seats?.length > 0 && (
                <View
                  style={{
                    width: "100%",
                    borderWidth: 0.5,
                    borderColor: "purple",
                    marginVertical: 5,
                  }}
                />
              )}
              {item?.seats?.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[styles.text2, { marginHorizontal: 0 }]}>
                    Please select your seat (only one)
                  </Text>
                  <Text
                    style={[
                      styles.text2,
                      {
                        marginHorizontal: 0,
                        fontSize: 12,
                        opacity: 0.5,
                        color: "red",
                      },
                    ]}
                  >
                    SEAT {selectedSeat}
                  </Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  margin: 0,
                  justifyContent: "center",
                  flex: 1,
                  flexWrap: "wrap",
                }}
              >
                {item?.seats?.map((data: any, index: any) => (
                  <TouchableOpacity
                    style={{
                      margin: 10,
                      height: 20,
                    }}
                    onPress={() => {
                      setselectedSeat(data);
                    }}
                    activeOpacity={0.9}
                  >
                    <Image
                      source={seatLogo}
                      style={[
                        {
                          marginRight: index !== 0 && index % 4 === 0 ? 15 : 0,
                          width: 18,
                          height: 18,
                          tintColor: data === selectedSeat ? "red" : "darkgray",
                        },
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          )}
        </View>
      )}
    />
  );
};

export default Tickets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    fontFamily: "Poppins",
    margin: 10,
    marginBottom: 0,
    fontSize: 18,
    color: "white",
    textAlign: "justify",
  },
  text2: {
    fontFamily: "Poppins",
    fontSize: 14,
    marginHorizontal: 10,
    color: "white",
    textAlign: "justify",
  },
  card: {
    margin: 15,
    marginBottom: 5,
    borderColor: "purple",
    borderWidth: 2,
    borderStyle: "dotted",
    borderRadius: 10,
    //flexDirection: "row",
    //justifyContent: "space-between",
  },
  seats: {
    margin: 15,
    marginBottom: 5,
    marginTop: 0,
    borderColor: "purple",
    borderWidth: 0,
    borderRadius: 10,
    //height: 200,
  },
  smalltxt: {
    margin: 0,
    fontFamily: "Poppins",
    //fontSize: 10,
    color: "white",
  },
});
