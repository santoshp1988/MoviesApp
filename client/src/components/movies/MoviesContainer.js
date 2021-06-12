import React from 'react';
import MovieList from './MovieList';
import { useEffect, useState } from 'react';
import { getAllMovies } from '../../services/MoviesService';

function MoviesContainer(props) {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getAllMovies().then(movies => setMovies(movies));
    }, []);

    return (
        <div>
            <MovieList movies={movies}></MovieList>
        </div>
    );
}

export default MoviesContainer;