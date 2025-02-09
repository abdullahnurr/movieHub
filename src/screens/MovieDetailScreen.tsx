import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Share,
  TouchableOpacity,
} from "react-native";
import type { Movie } from "../types/movie";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMovies } from "../context/MoviesContext";
import { useToast } from "../context/ToastContext";

type RootStackParamList = {
  MovieDetail: { movie: Movie };
  MainTabs: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "MovieDetail">;

export const MovieDetailScreen = ({ route }: Props) => {
  const { movie } = route.params;
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovies();
  const isMovieFavorite = isFavorite(movie.id);
  const { showToast } = useToast();

  const handleShare = async () => {
    try {
      const result = await Share.share(
        {
          title: movie.original_title,
          message: `Check out this movie: ${movie.original_title}\n\n${movie.overview}\n\nRating: ⭐️ ${movie.vote_average}/10`,
        },
        {
          dialogTitle: `Share ${movie.original_title}`,
          subject: `Check out this movie: ${movie.original_title}`,
          tintColor: "#f5c518",
        }
      );

      if (result.action === Share.sharedAction) {
        showToast("Film başarıyla paylaşıldı", "success");
      } else if (result.action === Share.dismissedAction) {
        console.log("Share was dismissed");
      }
    } catch (error) {
      showToast("Paylaşım sırasında bir hata oluştu", "error");
    }
  };

  const handleFavorite = async () => {
    try {
      if (isMovieFavorite) {
        await removeFromFavorites(movie.id);
        showToast("Film favorilerden kaldırıldı", "info");
      } else {
        await addToFavorites(movie);
        showToast("Film favorilere eklendi", "success");
      }
    } catch (error) {
      showToast("Bir hata oluştu", "error");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: movie.backdrop_path }}
        style={styles.backdrop}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{movie.original_title}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Text style={styles.actionButtonIcon}>📤</Text>
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleFavorite}
            >
              <Text style={styles.actionButtonIcon}>
                {isMovieFavorite ? "❤️" : "🤍"}
              </Text>
              <Text style={styles.actionButtonText}>
                {isMovieFavorite ? "Favorited" : "Add to Favorites"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  headerContainer: {
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionButtonIcon: {
    fontSize: 18,
  },
  actionButtonText: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: "500",
  },
});
