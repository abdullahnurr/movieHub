import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { MovieCard } from "../components/MovieCard";
import { useMovies } from "../context/MoviesContext";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Movie } from "../types/movie";
import styled from "styled-components/native";

type RootStackParamList = {
  MovieDetail: { movie: Movie };
  MainTabs: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding: ${({ theme }) => theme.spacing.lg}px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const MovieList = styled(FlatList)`
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
`;

export const ProfileScreen = ({ navigation }: Props) => {
  const { favoriteMovies } = useMovies();

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate("MovieDetail", { movie });
  };

  return (
    <Container>
      <Title>Favorite Movies</Title>
      {favoriteMovies.length === 0 ? (
        <EmptyContainer>
          <EmptyText>Henüz Favori Film Eklemediniz!</EmptyText>
        </EmptyContainer>
      ) : (
        <MovieList
          data={favoriteMovies}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={handleMoviePress} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </Container>
  );
};
