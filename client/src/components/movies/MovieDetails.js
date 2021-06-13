import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import { getMovie } from '../../services/MoviesService';
import {
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Language, LocationOn, Movie, SurroundSound } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';

function MovieDetails() {
    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        padding: {
            padding: '2rem',
            margin: '1rem',
        },
        margin: {
            marginRight: '.5rem'
        },
        image: {
            maxWidth: '90%',
        }
    });
    let { id } = useParams();
    const classes = useStyles();

    const [movieDetails, setMovieDetails] = useState()

    useEffect(() => {
        getMovie(id).then(movie => setMovieDetails(movie));
    }, [id]);

    console.log(movieDetails);

    return movieDetails ? (
        <div className={classes.root}>
            <Typography align="center" variant="h4" gutterBottom>
                {movieDetails.title}
            </Typography>
            <Paper className={classes.padding}>
                <Grid container alignContent="center">
                    <Grid align="center" item xs="12" lg="4">
                        <img className={classes.image} src={movieDetails.poster} alt={movieDetails.title} />
                    </Grid>
                    <Grid item xs="12" lg="8">
                        <Typography variant="subtitle" gutterBottom>
                            {movieDetails.plot}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOn />
                                </ListItemIcon>
                                <ListItemText primary={movieDetails.location} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Language />
                                </ListItemIcon>
                                <ListItemText primary={movieDetails.language} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Movie />
                                </ListItemIcon>
                                <ListItemText primary={movieDetails.listingType.replace("_", " ")} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <SurroundSound />
                                </ListItemIcon>
                                <ListItemText>
                                    {movieDetails.soundEffects.map(s => (<Chip className={classes.margin} label={s}></Chip>))}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <Rating readOnly={true} precision={0.1} defaultValue={movieDetails.rating} max={10} />
                            </ListItem>
                        </List>
                    </Grid>

                </Grid>
            </Paper>
            <Paper className={classes.padding}>
                <Typography variant="h5" gutterBottom>
                    Screen Grabs
                </Typography>
                <Grid container>
                    {
                        movieDetails.stills.map(still => (<Grid className={classes.margin} item>
                            <img className={classes.image} src={still} alt="still" />
                        </Grid>))
                    }
                </Grid>
            </Paper>
        </div>
    ) : <div>Which movie is this?</div>;
}

export default MovieDetails;