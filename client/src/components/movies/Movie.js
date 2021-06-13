import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 325,
    },
    link: {
        textDecoration: 'none'
    }
});

function Movie(props) {
    const classes = useStyles();

    if (!props.movie) return null;

    const { title, image, rating, imdbID } = props.movie;
    return (
        <Link className={classes.link} to={`/movie/${imdbID}`}>
            <Card className={classes.root}>
                <CardActionArea>
                    {image &&
                        <img
                            component="img"
                            alt={title}
                            height="400"
                            width="350"
                            src={image}
                            title={title}
                        />
                    }
                    <CardContent>
                        {title &&
                            <Typography noWrap gutterBottom variant="h5">
                                {title}
                            </Typography>
                        }
                        <Rating readOnly={true} precision={0.1} defaultValue={rating} max={10} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link >
    );
}

export default Movie;