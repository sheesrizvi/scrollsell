import React, { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import client from "../api/client"
import AppFormPicker from "../components/AppFormPicker";
import CategoryPickerItem from "../components/CategoryPickerItem";
import { AppFormField, SubmitButton, AppForm } from "../components/forms";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import Screen from "../components/Screen";
import listingsApi from "../api/listings";
import categoriesApi from "../api/categories";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image"),
});

function ListingEditScreen({ route }) {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState("");
  const getCategoriesApi = useApi(categoriesApi.getCategories);

  useEffect(() => {
    getCategoriesApi.request();
  }, []);

  const handleSubmit = async (listing, { resetForm }) => {
    const source = route.params.source;

    const result = new FormData();
    result.append("video", {
      name: "video",
      type: "video/mp4",
      uri: source,
    });

    try {
      
      const { data } = await client.post("/upload", result);
      console.log(listing);
      setVideo(data);
      console.log(data);
      // navigation.navigate("Listings", {});
      // console.log(res);
      setProgress(0);
      setUploadVisible(true);
      const formResult = await listingsApi.addListing(
        { ...listing, location, data },
        (progress) => setProgress(progress)
      );

      if (!formResult.ok) {
        setUploadVisible(false);
        return alert("Could not save the listing");
      }

      resetForm();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          video: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* <AppFormImagePicker name="images" /> */}
        <Image
          source={{ uri: route.params.source }}
          style={styles.mediaPreview}
        />
        <AppFormField maxLength={255} name="title" placeholder="Title" />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <AppFormPicker
          items={getCategoriesApi.data}
          name="category"
          numberOfColumns={3}
          placeholder="Category"
          PickerItemComponent={CategoryPickerItem}
          width="50%"
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton style={styles.SubmitButton} title="Post" />
      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.light
    marginHorizontal: 10,
  },
  SubmitButton: {
    marginLeft: 40,
    marginTop: 40,
  },
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

export default ListingEditScreen;
