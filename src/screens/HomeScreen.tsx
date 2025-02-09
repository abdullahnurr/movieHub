import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { MovieCard } from "../components/MovieCard";
import { getMovies } from "../services/movieService";
import type { Movie } from "../types/movie";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMovies } from "../context/MoviesContext";
import { useToast } from "../context/ToastContext";
import styled from "styled-components/native";
import { StyledList } from "../components/common/StyledList";
import { Loading } from "../components/common/Loading";

type RootStackParamList = {
  MovieDetail: { movie: Movie };
  MainTabs: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledActivityIndicator = styled(ActivityIndicator)`
  color: ${({ theme }) => theme.colors.primary};
`;

const MovieList = styled(FlatList)`
  background-color: ${({ theme }) => theme.colors.background};
`;

const ListContainer = styled.View`
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
`;

export const HomeScreen = ({ navigation }: Props) => {
  const { setMovies: setContextMovies } = useMovies();
  const { showToast } = useToast();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMovies = async (pageNumber = 1) => {
    try {
      const response = await getMovies(pageNumber);
      if (pageNumber === 1) {
        setMovies(response.data);
        setContextMovies(response.data);
        showToast("Filmler başarıyla yüklendi", "success");
      } else {
        setMovies((prev) => [...prev, ...response.data]);
        showToast("Daha fazla film yüklendi", "info");
      }
    } catch (error) {
      showToast("Filmler yüklenirken bir hata oluştu", "error");
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    showToast("Yenileniyor...", "info");
    fetchMovies(1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate("MovieDetail", { movie });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <StyledList
      data={movies}
      renderItem={({ item }) => (
        <MovieCard movie={item} onPress={handleMoviePress} />
      )}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};
