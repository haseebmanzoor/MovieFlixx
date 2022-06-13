import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "@react-navigation/native";
import { HOME_TOP } from "../../API/HomeData";
import { HomeShimmer } from "../../Shimmers";
type Props = {};

const Home = (props: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  // Initial value for opacity: 0
  const [firebaseData, setfirebaseData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const getTrending = async () => {
    const snapshot = await firebase.firestore().collection("trending").get();
    const data = snapshot.docs.map((doc) => doc.data());
    setfirebaseData(data);
  };
  useEffect(() => {
    getTrending();
    //console.log(firebaseData);
  }, []);
  useEffect(() => {
    firebaseData.length > 0 ? setLoaded(true) : setLoaded(false);
    //console.log(firebaseData);
  }, [firebaseData]);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  const translate = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  });
  const scale = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 0],
  });
  return isLoaded ? (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: translate,
            },
          ],
        },
      ]}
    >
      <Text style={styles.text}>Trending</Text>
      <LinearGradient
        colors={["transparent", "rgba(242, 76, 76,0)"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{ marginBottom: 15 }}
      >
        <FlatList
          data={firebaseData}
          keyExtractor={(item) => item.title + Math.random()}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{}}
          renderItem={({ item, index }) => (
            <View style={{ padding: 5, borderRadius: 10 }}>
              <SharedElement id={item.display_cover}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MovieDetails", {
                      title: item.title,
                      year: item.year,
                      rating: item.rating,
                      display_cover: item.display_cover,
                      duration: item.duration,
                      overview: item.overview,
                      director: item.director,
                      writer: item.writer,
                      topcast: item.topcast,
                      tickets: item?.tickets?.map((v: any) => v),
                    })
                  }
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: item.display_cover }}
                    style={styles.img}
                    resizeMode={"cover"}
                  />
                </TouchableOpacity>
              </SharedElement>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.year}>{item.rating}</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.year}>{item.duration}</Text>
                <Text style={styles.year}>{item.year}</Text>
              </View>
            </View>
          )}
        />
      </LinearGradient>
    </Animated.View>
  ) : (
    <View style={{ marginTop: 70 }}>
      <HomeShimmer />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {},
  text: {
    fontFamily: "PoppinsBold",
    color: "white",
    fontSize: 20,
    marginTop: 65,
    marginHorizontal: 5,
  },
  img: {
    width: 130,
    height: 200,
    borderRadius: 3,
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "white",
    marginRight: 5,
    paddingHorizontal: 2,
    marginBottom: -5,
    maxWidth: 100,
    minWidth: 100,
  },
  year: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "white",
    opacity: 0.6,
    paddingHorizontal: 2,
    marginBottom: -5,
  },
});
