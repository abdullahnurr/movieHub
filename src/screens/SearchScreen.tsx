import React, { useState } from "react";
import { View, TextInput, FlatList } from "react-native";
import styled from "styled-components/native";
import { MovieCard } from "../components/MovieCard";
import { searchMovies } from "../services/movieService";
import type { Movie } from "../types/movie";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDebouncedCallback } from "../hooks/useDebounce";
import { useMovies } from "../context/MoviesContext";
import { StyledList } from "../components/common/StyledList";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SearchInput = styled.TextInput`
  height: 50px;
  border-radius: 25px;
  padding-horizontal: 20px;
  background-color: ${({ theme }) => theme.colors.button.background};
  margin: ${({ theme }) => theme.spacing.md}px;
  font-size: 16px;
`;

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
    <Container>
      <SearchInput
        placeholder="Film Ara..."
        value={searchQuery}
        onChangeText={handleQueryChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <StyledList
        data={filteredMovies}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={handleMoviePress} />
        )}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};
