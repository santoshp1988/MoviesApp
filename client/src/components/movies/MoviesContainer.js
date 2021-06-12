import React from 'react';
import MovieList from './MovieList';
import { useEffect, useState } from 'react';

function MoviesContainer(props) {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        console.log('env url', process.env);
        fetch(`${process.env.REACT_APP_MOVIES_SERVICE_URL}/api/movies`).then(res => res.json()).then(data => {
            const movies = data.map(x => ({ title: x.title, image: x.poster, rating: x.rating, imdbID: x.id }));
            setMovies(movies);
        });
    }, []);

    return (
        <div>
            <MovieList movies={movies}></MovieList>
        </div>
    );
}

export default MoviesContainer;