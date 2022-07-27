import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../App.styles";

function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Movie List")}
      >
        <Text style={styles.buttonText}>Movie List</Text>
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Movie List Homepage</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default Home;
