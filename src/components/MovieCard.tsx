import styled from "styled-components/native";
import type { Movie } from "../types/movie";
import { useMovies } from "../context/MoviesContext";
import { useToast } from "../context/ToastContext";

const Card = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin: ${({ theme }) => theme.spacing.md}px
    ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  ${({ theme }) => theme.shadows.default}
`;

const Poster = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
`;

const InfoContainer = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ReleaseDate = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const Rating = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const Votes = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

const Overview = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  line-height: 20px;
`;

const FavoriteButton = styled.TouchableOpacity`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm}px;
  right: ${({ theme }) => theme.spacing.sm}px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export const MovieCard = ({ movie, onPress }: MovieCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovies();
  const { showToast } = useToast();
  const isMovieFavorite = isFavorite(movie.id);

  const handleFavoritePress = async () => {
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
    <Card onPress={() => onPress(movie)} activeOpacity={0.8}>
      <Poster source={{ uri: movie.poster_path }} resizeMode="cover" />
      <InfoContainer>
        <Title numberOfLines={2}>{movie.original_title}</Title>
        <ReleaseDate>{new Date(movie.release_date).getFullYear()}</ReleaseDate>
        <RatingContainer>
          <Rating>⭐️ {movie.vote_average.toFixed(1)}</Rating>
          <Votes>({movie.vote_count} votes)</Votes>
        </RatingContainer>
        <Overview numberOfLines={3}>{movie.overview}</Overview>
      </InfoContainer>
      <FavoriteButton onPress={handleFavoritePress}>
        <Title>{isMovieFavorite ? "❤️" : "🤍"}</Title>
      </FavoriteButton>
    </Card>
  );
};
