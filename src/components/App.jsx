import React, { Component } from 'react';
import fetchMovies from 'services/api';
import Button from './Button/Button';
import MoviesList from './MoviesList/MoviesList';

class App extends Component {
  state = {
    isMoviesShown: false,
    page: 1,
    movies: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { movies, isMoviesShown, page } = this.state;

    if (
      (prevState.isMoviesShown !== isMoviesShown && isMoviesShown) ||
      (prevState.page !== page && isMoviesShown)
    ) {
      fetchMovies(page).then(response => {
        const moviesInfo = response.map(
          ({ id, title, release_date, poster_path, vote_count }) => {
            return {
              id,
              title,
              date: release_date,
              poster: `https://image.tmdb.org/t/p/original/${poster_path}`,
              votes: vote_count,
            };
          }
        );

        this.setState({ movies: [...movies, ...moviesInfo] });
      });
    }

    if (prevState.isMoviesShown !== isMoviesShown && !isMoviesShown) {
      this.setState({ page: 1, movies: [] });
    }
  }

  onBtnClick = () => {
    this.setState({ isMoviesShown: true });
  };

  onLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  render() {
    const { onBtnClick, onLoadMore } = this;
    const { isMoviesShown, movies } = this.state;

    return (
      <>
        <Button
          clickHandler={onBtnClick}
          text={isMoviesShown ? 'Hide movies' : 'Show movies'}
        />
        {movies.length > 0 && (
          <>
            <MoviesList moviesInfo={movies} />{' '}
            <Button clickHandler={onLoadMore} text="Load more" />
          </>
        )}
      </>
    );
  }
}

export default App;
