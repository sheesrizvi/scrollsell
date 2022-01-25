import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import client from "../api/client";
import ActivityIndicator from "../components/ActivityIndicator";

export default function SavePostScreen({ route }) {
  const [description, setDescription] = useState("");
  const [requestRunning, setRequestRunning] = useState(false);

  const navigation = useNavigation();

  const handleSavePost = async () => {
    setRequestRunning(true);
    console.log("save post button clicked");

    const source = route.params.source;

    const result = new FormData();
    result.append("video", {
      name: "video",
      type: "video/mp4",
      uri: source,
    });

    try {
      setRequestRunning(true);
      const res = await client.post("/upload", result);
      navigation.navigate("Listings", {});
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  return (
    <Screen>
      <View style={styles.formContainer}>
        <TextInput
          maxLength={150}
          multiline
          placeholder="Describe your videos"
          onChangeText={(text) => setDescription(text)}
          style={styles.inputText}
        />
        <Image
          source={{ uri: route.params.source }}
          style={styles.mediaPreview}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Feather name="x" size={24} color="black" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSavePost()}
          style={styles.postButton}
        >
          <Feather name="corner-left-up" size={24} color="white" />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  uploadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    flex: 1,
  },
  formContainer: {
    margin: 20,
    flexDirection: "row",
  },
  buttonsContainer: {
    flexDirection: "row",
    margin: 20,
  },
  inputText: {
    paddingVertical: 10,
    marginRight: 20,
    flex: 1,
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: "black",
    width: 60,
  },
  cancelButton: {
    alignItems: "center",
    flex: 1,
    borderColor: "lightgray",
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 4,
    marginRight: 10,
  },
  postButton: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ff4040",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 4,
    marginRight: 10,
  },
  cancelButtonText: {
    marginLeft: 5,
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  postButtonText: {
    marginLeft: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
