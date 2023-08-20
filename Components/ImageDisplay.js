import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ImageContainer from "./ImageContainer";

const ImageDisplay = () => {
  const [galleryCount, setGalleryCount] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        <View style={styles.imageWrapper}>
          <ImageContainer setGalleryCount={setGalleryCount} />
        </View>
        <View style={styles.imageWrapper}>
          <ImageContainer setGalleryCount={setGalleryCount} />
        </View>
        <View style={styles.imageWrapper}>
          <ImageContainer setGalleryCount={setGalleryCount} />
        </View>
        <View style={styles.imageWrapper}>
          <ImageContainer setGalleryCount={setGalleryCount} />
        </View>
        <View style={styles.imageWrapper}>
          <ImageContainer setGalleryCount={setGalleryCount} />
        </View>
        <View style={styles.imageWrapper}>
          <ImageContainer setGalleryCount={setGalleryCount} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  mediaContainer: {
    backgroundColor: "lavender",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: "90%",
    height: 400,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  imageWrapper: {
    marginBottom: 10,

    height: 100,
    width: 100,
  },
});

export default ImageDisplay;
