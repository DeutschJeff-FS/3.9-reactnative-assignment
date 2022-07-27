import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../App.styles";
import ListContainer from "../components/ListContainer";

function Dashboard() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    director: "",
    releaseYear: "",
  });

  const onChangeTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const onChangeDirector = (value) => {
    setValues({ ...values, director: value });
  };

  const onChangeReleaseYear = (value) => {
    setValues({ ...values, releaseYear: value });
  };

  const saveMovie = async () => {
    setLoading(true);
    await fetch(
      `https://deutschjeff-crudapi-assignment.herokuapp.com/api/v1/movies`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      }
    )
      .then((res) => {
        setLoading(false), res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Movie List</Text>
      <ListContainer />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={"Movie Title"}
          onChangeText={(value) => onChangeTitle(value)}
          style={styles.input}
        />
        <TextInput
          placeholder={"Movie Director"}
          onChangeText={(value) => onChangeDirector(value)}
          style={styles.input}
        />
        <TextInput
          placeholder={"Movie Release Year"}
          onChangeText={(value) => onChangeReleaseYear(value)}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={saveMovie} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Movie</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default Dashboard;
