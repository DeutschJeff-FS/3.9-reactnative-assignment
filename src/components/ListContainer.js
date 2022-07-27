import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../App.styles";

export default function ListContainer() {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    setLoading(true);
    try {
      await fetch(
        `https://deutschjeff-crudapi-assignment.herokuapp.com/api/v1/movies`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setMovies(data);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getMovies();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.movie}
          onPress={() => navigation.navigate("Movie")}
        >
          <Text style={styles.movieTitle}>{item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item._id}
    />
  );
}
