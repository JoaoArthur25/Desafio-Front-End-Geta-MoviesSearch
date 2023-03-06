import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Header.js";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 400px;
  margin-top: 20px;
  margin-bottom: 10px;
  border: 1px solid black;
`;

const Button = styled.button`
  background-color: ${props => props.color};
  color: white;
  border: none;
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const MovieDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

const MoviePoster = styled.img`
  max-width: 300px;
  margin-right: 20px;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieTitle = styled.h2`
  margin-top: 0;
`;

const MovieRating = styled.p`
  margin-top: 0;

`;
const FavoriteButton = styled.button`
  background-color: ${props => props.isFavorite ? 'red' : 'green'};
  color: white;
  border: none;
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;
const FavoriteDetailsButton = styled(Button)`
  background-color: purple;
`;

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const searchMovies = async (event) => {
    event.preventDefault();

    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=7eecb176&s=${query}`
    );

    setMovies(response.data.Search);
    setSelectedMovie(null);
  };

  const selectMovie = async (movie) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=7eecb176&i=${movie.imdbID}&plot=full`
    );

    setSelectedMovie(response.data);
  };

const addFavoriteMovie = (movie) => { 
  const alreadyFavorited = favorites.some((favMovie) => favMovie.imdbID === movie.imdbID);

if (!alreadyFavorited) {
setFavorites([...favorites, movie]);
}
};

const removeFavoriteMovie = (movie) => {
setFavorites(favorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID));
};
  

    return (

      
        <div>
        <Header />
        <Container>
          <form onSubmit={searchMovies}>
            <StyledInput
              type="text"
              placeholder="Enter a movie."
              value={query}
              onChange={(event) => setQuery(event.target.value)} />
            <Button type="submit" color="blue">
              Search
            </Button>
            <Button
              type="button"
              color="red"
              onClick={() => {
                setMovies([]);
                setSelectedMovie(null);
                setQuery("");
              } }
            >
              Reset
            </Button>
          </form>
          {selectedMovie ? (
            <MovieDetailsContainer>
              <MoviePoster
                src={selectedMovie.Poster}
                alt={`${selectedMovie.Title} poster`} />
              <MovieInfo>
                <MovieTitle>{selectedMovie.Title}</MovieTitle>
                <MovieRating>Rating: {selectedMovie.imdbRating}/10</MovieRating>
                <p>Actors: {selectedMovie.Actors}</p>
                <p>Plot:{selectedMovie.Plot}</p>
                <p>Director: {selectedMovie.Director}</p>
                <p>Year: {selectedMovie.Year}</p>


                <p>Genre: {selectedMovie.Genre}</p>
                <FavoriteButton
                  onClick={() => {
                    if (favorites.includes(selectedMovie)) {
                      removeFavoriteMovie(selectedMovie);
                    } else {
                      addFavoriteMovie(selectedMovie);
                    }
                  } }
                  isFavorite={favorites.includes(selectedMovie)}
                >
                  {favorites.includes(selectedMovie) ? 'Remove from favorites' : 'Add to favorites'}
                </FavoriteButton>
              </MovieInfo>
            </MovieDetailsContainer>
          ) : (
            movies.map((movie) => (
              <div key={movie.imdbID}>
                <img src={movie.Poster} alt={movie.Title} width="200" height="300" />
                <p>{movie.Title}</p>
                <FavoriteDetailsButton onClick={() => selectMovie(movie)}>Details</FavoriteDetailsButton>
                <FavoriteButton
                  onClick={() => {
                    if (favorites.includes(movie)) {
                      removeFavoriteMovie(movie);
                    } else {
                      addFavoriteMovie(movie);
                    }
                  } }
                  isFavorite={favorites.includes(movie)}
                >
                  {favorites.includes(movie) ? 'Remove from favorites' : 'Add to favorites'}
                </FavoriteButton>
              </div>
            ))
          )}
          {favorites.length > 0 ? (
            <>
              <h2>Favorites</h2>
              {favorites.map((movie) => (
                <div key={movie.imdbID}>
                  <img src={movie.Poster} alt={movie.Title} width="175" height="200" />
                  <p>{movie.Title}</p>
                  <FavoriteDetailsButton onClick={() => selectMovie(movie)}>Details</FavoriteDetailsButton>
                  <FavoriteButton
                    onClick={() => removeFavoriteMovie(movie)}
                    isFavorite={true}
                  >
                    Remove from favorites
                  </FavoriteButton>
                </div>
              ))}
            </>
          ) : (
            <h2 style={{ color: 'black', fontSize: '24px' }}>No favorites yet. 😥</h2>
          )}
        </Container>
      </div>
      

);
}

export default App;

                