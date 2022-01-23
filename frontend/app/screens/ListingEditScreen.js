import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
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

// const categories = [
//   {
//     label: "Furniture",
//     value: 1,
//     backgroundColor: "#fc5c65",
//     icon: "floor-lamp",
//   },
//   { label: "Clothing", value: 2, backgroundColor: "green", icon: "email" },
//   { label: "Cameras", value: 3, backgroundColor: "blue", icon: "camera" },
//   { label: "Cars", value: 4, backgroundColor: "#fd9644", icon: "car" },
// ];

function ListingEditScreen(props) {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const getCategoriesApi = useApi(categoriesApi.getCategories)

  useEffect(() => {
    getCategoriesApi.request();
    
  }, []);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();
  };
 
  return (
    <Screen style={styles.container}>
      <UploadScreen onDone={() => setUploadVisible(false)} progress={progress} visible={uploadVisible} />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormImagePicker name="images" />
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
});

export default ListingEditScreen;
