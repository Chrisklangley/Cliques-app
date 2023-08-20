import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import React from "react";

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../img/antoine-beauvillain-zY_NaksFH1k-unsplash.jpg")}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Your Pics")}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Let's get started</Text>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "#333",
    borderRadius: 200,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
