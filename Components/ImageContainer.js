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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ImageContainer = ({ setGalleryCount, galleryCount }) => {
  const [selectedMedia, setSelectedMedia] = useState({ uri: null, type: null });
  const [toggleEdit, setToggleEdit] = useState(true);
  const [toggleModal, setToggleModal] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [Id, setId] = useState(null);
  const navigation = useNavigation();
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

        setGallery([...gallery, response.data]);
        setId(response.data.data._id);
        setGalleryCount(...galleryCount, "1");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const editHandler = ({}) => {
    Alert.alert(
      "Image Settings",
      "Would you like to edit or remove this image?",
      [
        {
          text: "Edit",
          onPress: () => {
            setToggleModal(!toggleModal);
          },
        },
        {
          text: "Remove",
          onPress: () => {},
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
        visible={toggleModal}
        style={styles.modalContainer}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={{
              marginTop: 150,
              position: "absolute",
              top: 10,
              left: 10,
              // backgroundColor: "red",
              width: 100,
              height: 100,
              zIndex: 1, 
            onPress={() => setToggleModal(false)}
          >
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
          {/* <CloudinaryImage
      publicId={
        gallery ? selectedMedia.uri : gallery[0].data.url // cloud name + public id
      }
      cloudName="your-cloud-name"
      width="100%"
      height="100%"
      resizeMode="contain"
    /> */}
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
    width: 100,
    height: 100,
    backgroundColor: "lightgray",
    borderRadius: 20,
    overflow: "hidden",
  },
  media: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  mediaInModal: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    marginTop: -60,
  },
  plusButton: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    opacity: 1,
  },
  modalContent: {
    padding: 20,
    backgroundColor: "#F3E6FE",
    borderRadius: 10,
    alignItems: "center",
    opacity: 0.98,
  },
  backBtn: {
    position: "absolute",

    right: 10,
    width: 50,
    height: 50,
  },
});

export default ImageContainer;
