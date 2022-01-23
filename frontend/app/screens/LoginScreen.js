import React, {  useState } from "react";
import { Image, StyleSheet } from "react-native";
import authApi from "../api/auth";

import * as Yup from "yup";

import Screen from "../components/Screen";
import {ErrorMessage, AppFormField, SubmitButton, AppForm} from '../components/forms'
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen() {
  const {logIn} = useAuth()

  const [loginFailed, setLoginFailed] = useState(false)

  const handleSubmit = async ({email, password}) => {
    const result = await authApi.login(email, password)
    console.log(result.data);
    if (!result.ok){ return setLoginFailed(true)}
    setLoginFailed(false)
    logIn(result.data.token)
  
  }

  return (
    <Screen style={{ padding: 20 }}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error="Invalid email and/or password" visible={loginFailed}/>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email Address"
          textContentType="emailAddress"
        />

        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />

        <SubmitButton title="Login" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    paddingTop: 50,
    paddingBottom: 20,
  },
  SubmitButton: {
    marginLeft: 40,
  },
});
