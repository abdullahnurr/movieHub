import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Share,
  TouchableOpacity,
} from "react-native";
import type { Movie } from "../types/movie";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMovies } from "../context/MoviesContext";
import { useToast } from "../context/ToastContext";
import styled, { useTheme } from "styled-components/native";
import { ShareIcon, StarIcon } from "../components/Icons";

type RootStackParamList = {
  MovieDetail: { movie: Movie };
  MainTabs: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "MovieDetail">;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const BackdropImage = styled.Image`
  width: ${Dimensions.get("window").width}px;
  height: 250px;
`;

const ContentContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-top: -20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border-top-right-radius: ${({ theme }) => theme.borderRadius.lg}px;
`;

const MovieTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const ReleaseYear = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Overview = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 24px;
  margin-vertical: ${({ theme }) => theme.spacing.lg}px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Rating = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Votes = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

const CastTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const CastList = styled.ScrollView`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const CastCard = styled.View`
  width: 100px;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const CastImage = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const CastName = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
`;

const Character = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

const HeaderContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const ActionButtons = styled.View`
  flex-direction: row;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const ActionButton = styled.TouchableOpacity<{ iconColor?: string }>`
  flex: 1;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.button.background};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const ActionButtonText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

const OverviewTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const formatReleaseDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      const [_, datePart] = dateString.split(", ");
      const [month, day, year] = datePart.split("/");
      return `${month}/${day}/${year}`;
    }
    return date.toLocaleDateString();
  } catch {
    return "N/A";
  }
};

export const MovieDetailScreen = ({ route }: Props) => {
  const { movie } = route.params;
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovies();
  const isMovieFavorite = isFavorite(movie.id);
  const { showToast } = useToast();
  const theme = useTheme();

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
    <ScrollContainer>
      <BackdropImage source={{ uri: movie.backdrop_path }} resizeMode="cover" />
      <ContentContainer>
        <HeaderContainer>
          <MovieTitle>{movie.original_title}</MovieTitle>
          <ActionButtons>
            <ActionButton onPress={handleShare}>
              <ShareIcon size={24} color={theme.colors.text.primary} />
              <ActionButtonText>Share</ActionButtonText>
            </ActionButton>
            <ActionButton onPress={handleFavorite}>
              <StarIcon
                size={24}
                color={theme.colors.text.primary}
                isFilled={isMovieFavorite}
              />
              <ActionButtonText>
                {isMovieFavorite ? "Favorited" : "Add to Favorites"}
              </ActionButtonText>
            </ActionButton>
          </ActionButtons>
        </HeaderContainer>
        <RatingContainer>
          <Rating>⭐️ {movie.vote_average.toFixed(1)}</Rating>
          <Votes>({movie.vote_count} votes)</Votes>
        </RatingContainer>
        <ReleaseYear>
          Released: {formatReleaseDate(movie.release_date)}
        </ReleaseYear>
        <OverviewTitle>Overview</OverviewTitle>
        <Overview>{movie.overview}</Overview>
        <CastTitle>Cast</CastTitle>
        <CastList horizontal showsHorizontalScrollIndicator={false}>
          {movie.casts.map((cast) => (
            <CastCard key={cast.id}>
              <CastImage
                source={{ uri: cast.profile_path }}
                resizeMode="cover"
              />
              <CastName numberOfLines={2}>{cast.name}</CastName>
              <Character numberOfLines={2}>{cast.character}</Character>
            </CastCard>
          ))}
        </CastList>
      </ContentContainer>
    </ScrollContainer>
  );
};

const { width } = Dimensions.get("window");
