import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Movie from './Movie';
import { Container } from '@material-ui/core';
import { MoviesContext } from '../../contexts/MoviesContext';

export default function MovieList() {
    const { movies } = useContext(MoviesContext);
    if (!movies) return null;

    return (
        <Container>
            { (movies.length > 0) ?
                (<Grid container justify="space-evenly" spacing={5}>
                    {
                        movies.map(movie => (<Grid key={movie.imdbID} item>
                            <Movie movie={movie} />
                        </Grid>))
                    }
                </Grid>) :
                (<div>No movies found!</div>)
            }
        </Container>
    );
}
