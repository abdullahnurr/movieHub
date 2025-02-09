import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { MovieCard } from "../../src/components/MovieCard";
import { ThemeProvider } from "styled-components/native";

// Theme mock'unu genişletiyoruz
const mockTheme = {
  colors: {
    background: "#ffffff",
    primary: "#f5c518",
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  shadows: {
    default: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
};

// Context hook'larını mockluyoruz
jest.mock("../../src/context/MoviesContext", () => ({
  useMovies: () => ({
    isFavorite: jest.fn(() => false),
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
  }),
}));

jest.mock("../../src/context/ToastContext", () => ({
  useToast: () => ({
    showToast: jest.fn(),
  }),
}));

// Test için örnek film verisi
const mockMovie = {
  id: "1",
  movie_id: 1,
  original_title: "Test Film",
  overview: "Film açıklaması burada",
  poster_path: "https://test.com/poster.jpg",
  backdrop_path: "https://test.com/backdrop.jpg",
  release_date: "2024-03-14",
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 500,
  casts: [],
};

// ThemeProvider ile sarmalanmış render fonksiyonu
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("MovieCard", () => {
  // Film başlığı, tarihi ve puanının doğru gösterildiğini test ediyoruz
  it("filmin temel bilgilerini doğru şekilde gösterir", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <MovieCard movie={mockMovie} onPress={onPress} />
    );

    expect(getByText("Test Film")).toBeTruthy();
    expect(getByText("2024")).toBeTruthy();
    expect(getByText("⭐️ 8.5")).toBeTruthy();
    expect(getByText("(1000 votes)")).toBeTruthy();
  });

  it("karta tıklandığında onPress fonksiyonunu çağırır", () => {
    const onPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <MovieCard movie={mockMovie} onPress={onPress} />
    );

    fireEvent.press(getByTestId("movie-card"));
    expect(onPress).toHaveBeenCalledWith(mockMovie);
  });

  it("film açıklamasını doğru şekilde gösterir", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <MovieCard movie={mockMovie} onPress={onPress} />
    );

    expect(getByText("Film açıklaması burada")).toBeTruthy();
  });

  it("favori olmayan filmler için boş kalp gösterir", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <MovieCard movie={mockMovie} onPress={onPress} />
    );

    expect(getByText("🤍")).toBeTruthy();
  });
});
