import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, Button, View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../App.styles";

function Movie({ route }) {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    director: "",
    releaseYear: "",
  });

  //TODO add id to route

  const onChangeTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const onChangeDirector = (value) => {
    setValues({ ...values, director: value });
  };

  const onChangeReleaseYear = (value) => {
    setValues({ ...values, releaseYear: value });
  };

  const getMovie = async () => {
    try {
      await fetch(
        `https://deutschjeff-crudapi-assignment.herokuapp.com/api/v1/movies/`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setValues({
            title: data.title,
            director: data.director,
            releaseYear: data.releaseYear,
          });
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  const updateMovie = async () => {
    try {
      await fetch(
        `https://deutschjeff-crudapi-assignment.herokuapp.com/api/v1/movies/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      )
        .then((res) => {
          res.json();
          navigation.navigate("Movie List");
        })
        .then((data) => console.log({ data }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async () => {
    try {
      await fetch(
        `https://deutschjeff-crudapi-assignment.herokuapp.com/api/v1/movies/`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      )
        .then((res) => {
          res.json();
          navigation.navigate("Movie List");
        })
        .then((data) => console.log({ data }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
      <Button
        title="Movie List"
        onPress={() => navigation.navigate("Movie List")}
      />
      <Text>Movie</Text>
      <View>
        <TextInput
          placeholder={"Movie Title"}
          onChangeText={(value) => onChangeTitle(value)}
          value={values.title}
        />
        <TextInput
          placeholder={"Movie Director"}
          onChangeText={(value) => onChangeDirector(value)}
          value={values.director}
        />
        <TextInput
          placeholder={"Movie Title"}
          onChangeText={(value) => onChangeReleaseYear(value)}
          value={values.releaseYear}
        />
      </View>
      <TouchableOpacity onPress={updateMovie} style={styles.addButton}>
        <Text style={styles.buttonText}>Edit Movie</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteMovie} style={styles.addButton}>
        <Text style={styles.buttonText}>Delete Movie</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Movie;
