import { StyleSheet, LogBox, ActivityIndicator } from "react-native";
import {
  InitialScreen,
  Loader,
  Login,
  Register,
  MovieDetails,
  Modal,
  TicketDetails,
} from "./Container";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";
import firebase from "firebase";

//! IGNORE EXPO WARNINGS
LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreAllLogs(true);

//! FIRESTORE APP CONFIGS
const firebaseConfig = {
  apiKey: "AIzaSyBRsxFjcgRV_u18Ov4q4iwx4K2bHBKKNiA",
  authDomain: "movieflix-20f8e.firebaseapp.com",
  projectId: "movieflix-20f8e",
  storageBucket: "movieflix-20f8e.appspot.com",
  messagingSenderId: "124354680296",
  appId: "1:124354680296:web:bd7e23cabf914baeb3405d",
  measurementId: "G-Y70R0RLE21",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const Stack = createSharedElementStackNavigator();
const Stacker = createStackNavigator();
export default function App() {
  //React States
  const [isloaded, setloaded] = useState(false);
  const [isloggedIn, setloggedIn] = useState(false);
  const checkAuth = () =>
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setloaded(true);
        setloggedIn(false);
      } else {
        setloaded(true);
        setloggedIn(true);
      }
    });
  useEffect(() => {
    checkAuth();
  }, []);
  const [loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });
  if (!loaded && !isloaded) {
    return <Loader />;
  }
  if (!isloggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen key={Date.now()} name="Main" component={InitialScreen} />
        <Stack.Screen
          name="TicketModal"
          component={TicketDetails}
          options={{
            cardStyle: { backgroundColor: "rgba(0,0,0,1)" },
          }}
        />
        <Stack.Screen
          key={Date.now()}
          name="MovieDetails"
          component={MovieDetails}
          sharedElements={(route) => {
            return [route.params.display_cover];
          }}
        />
        <Stack.Screen
          key={Date.now()}
          name="Modal"
          component={Modal}
          sharedElements={(route) => {
            return [route.params.display_cover];
          }}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: "rgba(0,0,0,0.8)" },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: "clamp",
                }),
              },
            }),
          }}
          mode="modal"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    elevation: 0,
  },
});
