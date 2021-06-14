import React from 'react';
import MovieList from './MovieList';
import { useEffect, useContext } from 'react';
import { getAllMovies } from '../../services/MoviesService';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import MovieDetails from '../movies/MovieDetails';
import { Container } from '@material-ui/core';
import FilterSet from './FilterSet';
import { MoviesContext } from '../../contexts/MoviesContext';

function MoviesContainer(props) {
    const { setAllMovies } = useContext(MoviesContext);
    useEffect(() => {
        getAllMovies().then(movies => { setAllMovies(movies); });
    }, []);

    return (
        <Container>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <FilterSet />
                        <MovieList />
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