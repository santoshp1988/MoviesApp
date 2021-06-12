import React from 'react';
import Grid from '@material-ui/core/Grid';
import Movie from './Movie';
import { Container } from '@material-ui/core';

export default function MovieList(props) {
    const { movies } = props;
    return (
        <Container>
            { (movies && movies.length > 0) ?
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
