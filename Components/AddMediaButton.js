import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const AddMediaButton = ({ onAddMedia, gallery }) => {
  const handleAddMedia = async () => {
    try {
      const { uri, cancelled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!cancelled) {
        const formData = new FormData();
        formData.append("file", {
          uri: uri,
          type: "image/jpg",
          name: new Date().toISOString() + "_newImg.jpg",
        });

        const response = await axios.post(
          "http://localhost:4592/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Server Upload Response:", response.data);

        const newMedia = response.data;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <View style={styles.addButtonContainer}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddMedia}>
        <Ionicons name="add-circle-outline" size={40} color="blue" />
        <Text style={styles.addMediaText}>Add Media</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addButtonContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lavender",
    padding: 5,
    borderRadius: 20,
  },
  addMediaText: {
    marginLeft: 5,
    color: "blue",
    fontWeight: "bold",
  },
});

export default AddMediaButton;
