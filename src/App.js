// React
import React, { useState, useEffect, } from 'react';
// API
import API from './utils/API';
// Components
import SearchField from './components/SearchField';
import SearchResult from './components/SearchResult';
import NomList from './components/NomList';
// Material-UI Components
import { Container, Grid, makeStyles, Snackbar, Grow } from '@material-ui/core';
// CSS
import './App.css'
const useStyles = makeStyles(() => ({
  container: {
    height: '100vh'
  },
}));

function App() {
  const classes = useStyles();
  // Movie list by search State
  const [movieList, setMovieList] = useState({
    movies: []
  });
  // Movie by title State
  const [movie, setMovie] = useState(null);
  // Nominations State
  const [nominations, setNominations] = useState({
    nominees: []
  });
  // Search State
  const [searchState, setSearchState] = useState(null);
  // Snackbar State
  const [open, setOpen] = useState({
    added: false,
    removed: false,
    completed: false,
    noMatch: false,
  });
  // Grow transition
  const [checked, setChecked] = useState(true);
  const [test, setTest] = useState(false)

  // Check localstorage for nominees
  useEffect(() => {
    let savedNominees = JSON.parse(localStorage.getItem('SHOPPIES'));
    if (savedNominees !== null) {
      setNominations({
        nominees: savedNominees
      });
    };
  }, []);

  useEffect(() => {
    // if nomination list is less than 5, enable all buttons
    if (nominations.nominees.length < 5) {
      const buttons = Array.from(document.getElementsByClassName('nominateBtn'));
      const buttonArray = Array.from(buttons);
      buttonArray.map(button => {
        button.disabled = false
      });
      // for each movie in nominations list, disable the button.
      nominations.nominees.forEach(movie => {
        let button = document.getElementById(movie.id);
        button.disabled = true
      });
    };

    // if nomination list is equal to 5, disable all buttons
    if (nominations.nominees.length == 5) {
      const buttons = Array.from(document.getElementsByClassName('nominateBtn'));
      const buttonArray = Array.from(buttons);
      buttonArray.map(button => {
        button.disabled = true
      });
      completeMessage();
    }
  }, [nominations, movieList]);

  useEffect(() => {
    // when movie state changes, push the movie into nominations list
    let update = nominations.nominees;
    if (movie !== null) {
      update.push(movie);

      setNominations({
        nominees: update
      });
      setTest(true)
      // set local storage with nominee list
      localStorage.setItem('SHOPPIES', JSON.stringify(nominations.nominees));
    }
  }, [movie]);

  const handleSearchInput = event => {
    event.preventDefault();
    const { value } = event.target;
    setSearchState(value);
    if (searchState === null || searchState === "") {
      setChecked(false);
    }
  };

  const handleSearchMovie = event => {
    event.preventDefault();
    if (searchState !== null && searchState !== "") {
      API.searchMovie(searchState).then(function (res) {
        if (res.data.Response === 'False') {
          setOpen({
            ...open,
            noMatch: true
          });
          setChecked(false);
        }
        if (res.data.Response === 'True') {
          setMovieList({
            movies: res.data.Search
          });
          setChecked(true);
        }
      });
    };
  };
  // Close snackbar messages
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setOpen(false);
  };

  const handleNominateBtn = async (event) => {
    event.preventDefault();
    let id = event.currentTarget.id
    let name = event.currentTarget.getAttribute('name');
    let button = document.getElementById(id);
    let data = await API.searchMovieByTitle(name).then(res => {
      return res.data;
    });

    if (data) {
      setMovie({
        title: data.Title,
        director: data.Director,
        released: data.Released,
        image: data.Poster,
        actors: data.Actors,
        plot: data.Plot,
        genre: data.Genre,
        id: data.imdbID
      });
      // open added snackbar
      if (nominations.nominees.length < 4) {
        setOpen({
          ...open,
          added: true,
        });
      }
    };
    button.disabled = true;
  };

  const handleRemoveBtn = event => {
    event.preventDefault();
    let id = event.currentTarget.id;
    let name = event.currentTarget.getAttribute('name');
    // find the button with the id
    let btn = document.getElementById(id);
    // find the index of the movie in the nominations list
    let nomineeIndex = nominations.nominees.findIndex(movie => movie.title === name);
    // remove the movie in the nominations list at it's index
    nominations.nominees.splice(nomineeIndex, 1);
    // let updated be equal to nomination list with removed movie
    let updated = nominations.nominees;
    // set the new nomination list
    setNominations({
      nominees: updated
    });
    // Remove item from local storage
    localStorage.setItem('SHOPPIES', JSON.stringify(nominations.nominees));
    // if button is disabled, enable nominate button
    btn.disabled = false;
    // open removed snackbar
    setOpen({
      ...open,
      removed: true,
    });
  };

  function completeMessage() {
    // open completed snackbar message
    setOpen({
      ...open,
      completed: true,
    });
  };

  return (
    <Container className={classes.container}>
      <h1>The Shoppies</h1>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchField
            handleSearchInput={handleSearchInput}
            handleSearchMovie={handleSearchMovie}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SearchResult
            movies={movieList.movies}
            handleNominateBtn={handleNominateBtn}
            nominations={nominations.nominees}
            checked={checked}

          />
          {/* Added snackbar message */}
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={open.noMatch}
            autoHideDuration={1750}
            onClose={handleClose}
            message="Could not find movie, please try again."
          />
          {/* Added snackbar message */}
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={open.added}
            autoHideDuration={1750}
            onClose={handleClose}
            message="Nomination added!"
          />
          {/* Removed snackbar mesage */}
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={open.removed}
            autoHideDuration={1750}
            onClose={handleClose}
            message="Nomination removed!"
          />
          {/* Completed snackbar message */}
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={open.completed}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Congratulations! Your nominations will be registered with others. Thank you for participating!"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grow in={test} timeout={500}>
            <NomList
              nominations={nominations.nominees}
              handleRemoveBtn={handleRemoveBtn}
              checked={test}
            />
          </Grow>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
