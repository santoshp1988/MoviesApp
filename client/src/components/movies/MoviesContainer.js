import React from 'react';
import MovieList from './MovieList';
import { useEffect, useState } from 'react';
import { getAllMovies } from '../../services/MoviesService';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import MovieDetails from '../movies/MovieDetails';
import { Container } from '@material-ui/core';

function MoviesContainer(props) {
    const [movies, setMovies] = useState();
    useEffect(() => {
        getAllMovies().then(movies => setMovies(movies));
    }, []);

    return (
        <Container>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <MovieList movies={movies}></MovieList>
                    </Route>
                    <Route path="/movie/:id">
                        <MovieDetails></MovieDetails>
                    </Route>
                </Switch>
            </Router>
        </Container>
    );
}

export default MoviesContainer;