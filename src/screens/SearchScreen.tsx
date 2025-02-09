import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { MovieCard } from "../components/MovieCard";
import { searchMovies } from "../services/movieService";
import type { Movie } from "../types/movie";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDebouncedCallback } from "../hooks/useDebounce";
import { useMovies } from "../context/MoviesContext";

type RootStackParamList = {
  MovieDetail: { movie: Movie };
  MainTabs: undefined;
  Search: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

export const SearchScreen = ({ navigation }: Props) => {
  const { movies: contextMovies } = useMovies();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const handleSearch = useDebouncedCallback((query: string) => {
    if (!query.trim()) {
      setFilteredMovies([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const results = contextMovies.filter((movie) =>
      movie.original_title.toLowerCase().includes(searchQuery)
    );
    setFilteredMovies(results);
  }, 300);

  const handleQueryChange = (text: string) => {
    setSearchQuery(text);
    handleSearch(text);
  };

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate("MovieDetail", { movie });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Film Ara..."
        value={searchQuery}
        onChangeText={handleQueryChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FlatList
        data={filteredMovies}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={handleMoviePress} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchInput: {
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 16,
    marginVertical: 16,
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  listContainer: {
    paddingVertical: 8,
  },
});
