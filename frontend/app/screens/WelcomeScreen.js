import React from "react";
import { Image, ImageBackground, StyleSheet, View, Text } from "react-native";
import AppButton from "../components/AppButton";

function WelcomeScreen({navigation}) {
  return (
    <ImageBackground style={styles.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.tagLine}>SCROLL, SELL, BUY, ENTERTAIN!!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate("Login")} />
        <AppButton title="Register" color="secondary" onPress={() => navigation.navigate("Register")}/>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
    alignItems: "center"
  },
  logoText: {
    fontSize: 25,
    color: "white",
  },
  logo: {
    width: 200,
    height: 200,
    // position: "absolute",
    // top: 70,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
    // justifyContent: 'center'
  },
  tagLine: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default WelcomeScreen;
