import React from "react";
import { View, Image, StyleSheet } from "react-native";

const ImageViewTest = ({ gallery }) => {
  const imageUrl = gallery && gallery.length > 0 ? gallery[0].data.url : null;

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ImageViewTest;
