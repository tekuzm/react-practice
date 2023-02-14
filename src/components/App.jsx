import React, { useState, useEffect } from 'react';

// ========== API ==========

import fetchMovies from 'services/api';

// ========== components ==========

import Button from './Button/Button';
import MoviesList from './MoviesList/MoviesList';
import Modal from './Modal/Modal';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isMoviesShown, setIsMovieShown] = useState(false);
  const [page, setPage] = useState(1);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [posterUrl, setPosterUrl] = useState();

  useEffect(() => {
    if (isMoviesShown) {
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

        setMovies(prevMovies => [...prevMovies, ...moviesInfo]);
      });
    } else {
      setMovies([]);
      setPage(1);
    }
  }, [page, isMoviesShown]);

  const onBtnClick = () => {
    setIsMovieShown(!isMoviesShown);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onDelete = id => {
    setMovieToDelete(id);
  };

  const onDeleteConfirm = () => {
    setMovies(prevMovies =>
      prevMovies.filter(movie => movieToDelete !== movie.id)
    );

    setMovieToDelete(null);
  };

  const onDeleteReject = () => {
    setMovieToDelete(null);
  };

  const openPoster = url => {
    setPosterUrl(url);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Button
        clickHandler={onBtnClick}
        text={isMoviesShown ? 'Hide movies' : 'Show movies'}
      />
      {movies.length > 0 && (
        <>
          <MoviesList
            moviesInfo={movies}
            deleteMovie={onDelete}
            showPoster={openPoster}
          />{' '}
          <Button clickHandler={onLoadMore} text="Load more" />
        </>
      )}
      {(movieToDelete || posterUrl) && (
        <Modal>
          {movieToDelete && (
            <>
              <p>Are you sure?</p>
              <Button text="Yes" clickHandler={onDeleteConfirm} />
              <Button text="No" clickHandler={onDeleteReject} />
            </>
          )}
          {posterUrl && <img src={posterUrl} alt="poster" />}
        </Modal>
      )}
    </div>
  );
};

// class App extends Component {
//   state = {
//     isMoviesShown: false,
//     page: 1,
//     movies: [],
//     movieToDelete: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { movies, isMoviesShown, page } = this.state;

//     if (
//       (prevState.isMoviesShown !== isMoviesShown && isMoviesShown) ||
//       (prevState.page !== page && isMoviesShown)
//     ) {
//       fetchMovies(page).then(response => {
//         const moviesInfo = response.map(
//           ({ id, title, release_date, poster_path, vote_count }) => {
//             return {
//               id,
//               title,
//               date: release_date,
//               poster: `https://image.tmdb.org/t/p/original/${poster_path}`,
//               votes: vote_count,
//             };
//           }
//         );

//         this.setState({ movies: [...movies, ...moviesInfo] });
//       });
//     }

//     if (prevState.isMoviesShown !== isMoviesShown && !isMoviesShown) {
//       this.setState({ page: 1, movies: [] });
//     }
//   }

//   onBtnClick = () => {
//     const { isMoviesShown } = this.state;

//     // isMoviesShown
//     //   ? this.setState({ isMoviesShown: false })
//     //   : this.setState({ isMoviesShown: true });

//     this.setState({ isMoviesShown: !isMoviesShown });
//   };

//   onLoadMore = () => {
//     const { page } = this.state;
//     this.setState({ page: page + 1 });
//   };

//   onDelete = id => {
//     this.setState({ movieToDelete: id });
//   };

//   onDeleteConfirm = () => {
//     const id = this.state.movieToDelete;

//     this.setState(prevState => ({
//       movies: prevState.movies.filter(movie => id !== movie.id),
//       movieToDelete: null,
//     }));
//   };

//   onDeleteReject = () => {
//     this.setState({ movieToDelete: null });
//   };

//   render() {
//     const {
//       onBtnClick,
//       onLoadMore,
//       onDelete,
//       onDeleteConfirm,
//       onDeleteReject,
//     } = this;
//     const { isMoviesShown, movies, movieToDelete } = this.state;

//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: '16px',
//           paddingBottom: '24px',
//         }}
//       >
//         <Button
//           clickHandler={onBtnClick}
//           text={isMoviesShown ? 'Hide movies' : 'Show movies'}
//         />
//         {movies.length > 0 && (
//           <>
//             <MoviesList moviesInfo={movies} deleteMovie={onDelete} />{' '}
//             <Button clickHandler={onLoadMore} text="Load more" />
//           </>
//         )}
//         {movieToDelete && (
//           <Modal>
//             <p>Are you sure?</p>
//             <Button text="Yes" clickHandler={onDeleteConfirm} />
//             <Button text="No" clickHandler={onDeleteReject} />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

export default App;
