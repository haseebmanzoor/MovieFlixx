import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

type Props = {};
const { width, height } = Dimensions.get("window");

const Login = (props: Props) => {
  const navigation = useNavigation();
  const showToast = (message: any) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const BACK = [
    "https://images.thedirect.com/media/article_full/ant-man-iron-man.jpg",
    "https://www.themoviedb.org/t/p/original/wKgiFYFFmOzF5Ivk18OWbj4akYP.jpg",
    "https://www.themoviedb.org/t/p/original/JCo4gelTpavJin6CnzEdfYwLsM.jpg",
    "https://www.themoviedb.org/t/p/original/h65lLhYEfRGOWVZzwX9n7vYOixf.jpg",
    "https://www.themoviedb.org/t/p/original/5NEfxZ0jWQNXKV1Xs5BtQuLD4Xw.jpg",
    "https://www.themoviedb.org/t/p/original/6YnoVAN1e6QQMlWNENgNnNOnzw.jpg",
    "https://www.themoviedb.org/t/p/original/7F4ji3bowguRGR6bRgrPZAKlpyU.jpg",
    "https://www.themoviedb.org/t/p/original/4Q1n3TwieoULnuaztu9aFjqHDTI.jpg",
    "https://www.themoviedb.org/t/p/original/6IWQEyzAJGCSrbVcBwt01JshDzc.jpg",
    "https://www.themoviedb.org/t/p/original/6YnoVAN1e6QQMlWNENgNnNOnzw.jpg",
    "https://www.themoviedb.org/t/p/original/wKgiFYFFmOzF5Ivk18OWbj4akYP.jpg",
    "https://www.themoviedb.org/t/p/original/JCo4gelTpavJin6CnzEdfYwLsM.jpg",
    "https://www.themoviedb.org/t/p/original/5ASYewhUCv8SqcQ5WiDODTDS7VS.jpg",
    "https://www.themoviedb.org/t/p/original/6YnoVAN1e6QQMlWNENgNnNOnzw.jpg",
    "https://www.themoviedb.org/t/p/original/JCo4gelTpavJin6CnzEdfYwLsM.jpg",
  ];
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textError, setError] = useState("");

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  const translate = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [350, 0],
  });

  const onSignIn = () => {
    if (email !== "" && password !== "") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => {
          console.log(err.code);
          if (err.code === "auth/user-not-found") {
            setError("User not found");
            showToast(textError);
          } else {
            setError("Invalid Credentials");
            showToast(textError);
          }
        });
    }
  };

  return (
    <View style={styles.fixedTop}>
      <Animated.Text style={[styles.text]}>
        Please enter your Credentials to continue
      </Animated.Text>
      <View>
        <FlatList
          data={BACK}
          keyExtractor={(index) => index.toString() + Math.random()}
          showsVerticalScrollIndicator={false}
          numColumns={4}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <Animated.Image
              source={{ uri: item }}
              style={[
                styles.image,
                {
                  transform: [{ translateY: translate }],
                },
              ]}
              resizeMode={"cover"}
            />
          )}
        />
      </View>
      <View style={styles.fixedView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          selectionColor={"red"}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          selectionColor={"red"}
        />
        <View style={styles.fixedView}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              onSignIn();
              Keyboard.dismiss;
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.text2}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.fixedView, { top: 300 }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            activeOpacity={0.8}
          >
            <Text style={styles.text3}>
              Already have an account ? Register Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  text: {
    fontFamily: "PoppinsBold",
    fontSize: 30,
    padding: 15,
    color: "#fff",
    marginTop: 50,
  },
  textRegister: {
    fontFamily: "Poppins",
    fontSize: 16,
    position: "absolute",
    top: 40,
    color: "#000",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    zIndex: 1,
    elevation: 1,
  },
  text2: {
    fontFamily: "Poppins",
    fontSize: 20,
    color: "#fff",
  },
  text3: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#A7C7E7",
  },
  fixedTop: {
    width,
    backgroundColor: "black",
    // height,
  },
  linearGradient: {
    width,
    height,
  },
  image: {
    width: width / 4,
    height: height * 0.3,
    opacity: 0.2,
  },
  textInput: {
    height: 55,
    width: width * 0.9,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "gray",
    backgroundColor: "white",
    margin: 10,
    fontFamily: "Poppins",
    fontSize: 18,
  },
  inputStyle: { fontSize: 16, borderRadius: 8 },
  labelStyle: {
    fontSize: 20,
    position: "absolute",
    top: -30,
    backgroundColor: "transparent",
    paddingHorizontal: 4,
    marginLeft: -4,
    fontFamily: "PoppinsBold",
  },
  placeholderStyle: { fontSize: 16, marginHorizontal: 5 },
  textErrorStyle: {
    fontSize: 12,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    alignSelf: "flex-start",
  },
  fixedView: {
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 200,
    width: width * 0.9,
    zIndex: 999,
  },
  touchable: {
    minWidth: 150,
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#fff",
    shadowOpacity: 1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  error: {
    fontFamily: "Poppins",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    alignSelf: "flex-start",
    color: "red",
    margin: 5,
  },
});
