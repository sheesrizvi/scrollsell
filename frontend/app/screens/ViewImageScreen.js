import React from "react";
import { Image, StyleSheet, View } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import colors from "../config/colors";

function ViewImageScreen(props) {
  return (
    <View style={styles.container}>
        <View style={styles.closeIcon}>
          <MaterialCommunityIcons name="close" color="white" size={30} />
        </View>
        <View style={styles.deleteIcon}>
        <MaterialCommunityIcons name="trash-can-outline" color="white" size={30} />
        </View>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{ uri: "https://picsum.photos/200/300" }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
      backgroundColor: "black"
  },
  closeIcon: {
    position: "absolute",
    top: 46,
    left: 30
  },
  image: {
    width: "100%",
    height: "100%",
  },
  deleteIcon: {
    position: "absolute",
    top: 46,
    right: 30
  },
});

export default ViewImageScreen;
