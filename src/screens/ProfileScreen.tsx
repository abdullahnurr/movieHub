import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MovieCard } from "../components/MovieCard";
import { useMovies } from "../context/MoviesContext";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Movie } from "../types/movie";

type RootStackParamList = {
  MovieDetail: { movie: Movie };
  MainTabs: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export const ProfileScreen = ({ navigation }: Props) => {
  const { favoriteMovies } = useMovies();

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate("MovieDetail", { movie });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      {favoriteMovies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite movies yet</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteMovies}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={handleMoviePress} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    color: "#1a1a1a",
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
