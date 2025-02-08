import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import type { Movie } from "../types/movie";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  MovieDetail: { movie: Movie };
  MainTabs: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "MovieDetail">;

export const MovieDetailScreen = ({ route }: Props) => {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: movie.backdrop_path }}
        style={styles.backdrop}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{movie.original_title}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐️ {movie.vote_average.toFixed(1)}</Text>
          <Text style={styles.votes}>({movie.vote_count} votes)</Text>
        </View>
        <Text style={styles.releaseDate}>
          Released: {new Date(movie.release_date).toLocaleDateString()}
        </Text>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>

        <Text style={styles.castTitle}>Cast</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {movie.casts.map((cast) => (
            <View key={cast.id} style={styles.castContainer}>
              <Image
                source={{ uri: cast.profile_path }}
                style={styles.castImage}
                resizeMode="cover"
              />
              <Text style={styles.castName} numberOfLines={2}>
                {cast.name}
              </Text>
              <Text style={styles.character} numberOfLines={2}>
                {cast.character}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backdrop: {
    width: width,
    height: width * 0.5625, // 16:9 aspect ratio
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: "#f5c518",
    fontWeight: "bold",
  },
  votes: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  releaseDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 16,
  },
  castTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  castContainer: {
    width: 100,
    marginRight: 12,
  },
  castImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 4,
  },
  castName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a1a",
    textAlign: "center",
  },
  character: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
