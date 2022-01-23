import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Button } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import listingsApi from "../api/listings";
import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";
import  AppButton  from "../components/AppButton";
import useApi from "../hooks/useApi";


// const listings = [
//   {
//     id: 1,
//     title: "Iphone 12 Pro",
//     price: 69999,
//     image: require("../assets/iphone12.jpg"),
//   },
//   {
//     id: 2,
//     title: "Apple Watch Series 6",
//     price: 39999,
//     image: require("../assets/watch.jpg"),
//   },

// ];

export default function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings)

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
    <Screen style={styles.screen}>
      {getListingsApi.error && (
        <>
          <AppText>Could not retrive listings</AppText>
          <AppButton title="Retry" onPress={loadListings} />
        </>
      )}
      <FlatList
        data={getListingsApi.data}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"₹" + item.price}
            image={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});
