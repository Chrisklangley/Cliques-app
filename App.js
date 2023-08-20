import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./Components/HomePage";
import ImageDisplay from "./Components/ImageDisplay";
import ImageViewTest from "./Components/ImageViewTest";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Lets Capture"
          component={HomePage}
          options={{ title: "Capture Moments" }}
        />
        <Stack.Screen name="Your Pics" component={ImageDisplay} />
        <Stack.Screen name="imageView" component={ImageViewTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
