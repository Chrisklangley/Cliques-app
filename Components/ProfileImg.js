import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Video,
  Alert,
  TouchableHighlight,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ProfileImg = () => {
  const [selectedMedia, setSelectedMedia] = useState({ uri: null, type: null });
  const [toggleEdit, setToggleEdit] = useState(true);
  const [toggleModal, setToggleModal] = useState(false);
  const [Id, setId] = useState(null);
  const [gallery, setGallery] = useState([]);

  const getImage = async () => {
    try {
      const response = await axios.get(`http://localhost:4592/getImage/${Id}`);

      console.log("get request for ", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  useEffect(() => {
    if (Id) {
      getImage();
    }
  }, [gallery]);

  const pickMedia = async () => {
    try {
      let { uri, cancelled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!cancelled) {
        setSelectedMedia({ uri: uri, type: "image" });
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
        console.log("id!!!!!!!!!!!!:");

        setGallery([...gallery, response.data]);
        setId(response.data.data._id);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  console.log("gallery:", gallery);
  console.log("ID:", Id);

  const editHandler = ({}) => {
    Alert.alert(
      "Image Settings",
      "Would you like to edit or remove this image?",
      [
        {
          text: "Edit",
          onPress: () => {
         
            navigation.navigate("imageView");
          },
        },
        {
          text: "Remove",
          onPress: () => {
       
          },
        },
        {
          text: "Cancel",
          onPress: () => {},
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        {selectedMedia.type === "video" ? (
          <TouchableHighlight>
            <Video
              source={{
                uri:
                  gallery && gallery[0]
                    ? gallery[0].data.url
                    : selectedMedia.uri,
              }}
              style={styles.media}
            />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight onPressIn={() => setToggleEdit(!toggleEdit)}>
            <Image
              source={{
                uri:
                  gallery && gallery[0] && gallery[0].data
                    ? gallery[0].data.url
                    : selectedMedia.uri,
              }}
              style={styles.media}
            />
          </TouchableHighlight>
        )}
        {!selectedMedia.uri && (
          <TouchableOpacity style={styles.plusButton} onPress={pickMedia}>
            <Ionicons name="ios-add" size={30} color="white" />
          </TouchableOpacity>
        )}
        {toggleEdit && selectedMedia.uri && (
          <TouchableOpacity style={styles.plusButton} onPress={editHandler}>
            <Ionicons name="ios-options-outline" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        control={toggleModal}
        visible={toggleModal}
        style={styles.modalContainer}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity>
            <Ionicons
              style={styles.backBtn}
              name="return-up-back-outline"
              size={40}
              color="black"
            />
          </TouchableOpacity>
          <Image
            source={{ uri: gallery ? selectedMedia.uri : gallery[0].data.url }}
            style={styles.mediaInModal}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaContainer: {
    width: 320,
    height: 150,
    backgroundColor: "lightgray",
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 70,
  },
  media: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  plusButton: {
    position: "absolute",
    width: "37",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    right: 0,
  },
});

export default ProfileImg;
