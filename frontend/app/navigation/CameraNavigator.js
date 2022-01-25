import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SavePostScreen from "../screens/SavePostScreen";
import CameraScreen from "../screens/CameraScreen";
import ListingEditScreen from "../screens/ListingEditScreen";

const Stack = createStackNavigator();

const CameraNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ListingEdit"
        component={ListingEditScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CameraNavigator;
