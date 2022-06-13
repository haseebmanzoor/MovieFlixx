import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { OverView, Reviews, Tickets } from "../Container";
type Props = {
  title: any;
  year: any;
  rating: any;
  overview: any;
  writer: any;
  topcast: any;
  director: any;
  duration: any;
  display_cover: any;
  tickets: [];
};

const MovieDetails = (props: Props) => {
  const Tab = createMaterialTopTabNavigator();
  const {
    title,
    year,
    rating,
    display_cover,
    overview,
    writer,
    topcast,
    director,
    duration,
    tickets,
  } = props;
  return (
    <View style={{ marginTop: 300, flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Overview"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 20,
            fontFamily: "PoppinsBold",
            textAlign: "left",
            justifyContent: "flex-start",
          },
          tabBarItemStyle: { width: 120, justifyContent: "flex-start" },
          tabBarStyle: { backgroundColor: "#000", elevation: 0 },
          tabBarActiveTintColor: "red",
          tabBarIndicatorStyle: { backgroundColor: "red" },
        }}
      >
        <Tab.Screen
          name="Overview"
          children={() => (
            <OverView
              overview={overview}
              writer={writer}
              topcast={topcast}
              director={director}
              duration={duration}
            />
          )}
        />
        <Tab.Screen
          name="Tickets"
          children={() => (
            <Tickets
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
          )}
        />
        <Tab.Screen name="Reviews" children={() => <Reviews />} />
      </Tab.Navigator>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
