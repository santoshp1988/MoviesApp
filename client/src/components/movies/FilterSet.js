import { TextField, Paper, Grid, Button } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Search } from '@material-ui/icons';
import { MoviesContext } from '../../contexts/MoviesContext';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    padding: {
        padding: '1rem',
        margin: '1rem',
    },
    search: {
        maxWidth: '80%'
    },
    searchBtn: {
        marginTop: '.7rem',
        marginLeft: '.2rem'
    }
}));

function FilterSet(props) {
    const classes = useStyles();

    const { movies, setMovies, allMovies, searchString, setSearchString,
        selectedFacets, setSelectedFacets,
        sortBy, setSortBy } = useContext(MoviesContext);

    const sortMovies = (movies) => {
        if (!movies) return;
        console.log('sort by:', sortBy);
        let comparer;
        switch (sortBy) {
            case "Rating09":
                comparer = (a, b) => (a.rating > b.rating) ? 1 : -1;
                break;

            case "Rating90":
                comparer = (a, b) => (a.rating < b.rating) ? 1 : -1;
                break;

            case "TitleAZ":
                comparer = (a, b) => (a.title > b.title) ? 1 : -1;
                break;

            case "TitleZA":
                comparer = (a, b) => (a.title < b.title) ? 1 : -1;
                break;

            default:
                comparer = (a, b) => (a.rating > b.rating) ? 1 : -1;
                break;
        }
        const sortedMovies = movies.sort(comparer);
        console.log('sorted movies', sortedMovies);
        return [...sortedMovies];
    };

    useEffect(() => {
        setMovies(sortMovies(allMovies));
    }, [allMovies]);

    useEffect(() => {
        criteriaChanged();
    }, [selectedFacets]);

    useEffect(() => {
        setMovies(sortMovies(movies));
    }, [sortBy]);


    const getFilterFacets = (collection, fields) => {
        const options = fields.map(field => {
            return ({
                name: field.name,
                field: field.field,
                options: ["ALL", ...new Set(collection?.map(x => x[field.field] || [])) || []]
            })
        })
        console.log('options', options);
        return options;
    };

    const filterProps = [{ name: 'Language', field: 'language' }, { name: 'Location', field: 'location' }];
    const filterCriteria = getFilterFacets(allMovies, filterProps);

    const changeSelectedFacets = (facet, val) => {
        setSelectedFacets((prevProps) => {
            return { ...prevProps, [facet]: val }
        });
    };

    const isMovieValid = (movie) => {
        const isMatch = Object.keys(selectedFacets).every(f => selectedFacets[f] === "ALL" || movie[f] === selectedFacets[f]);
        return isMatch && movie.title.toLowerCase().includes(searchString.toLowerCase())
    }

    const criteriaChanged = () => {
        console.log(searchString, movies);
        if (allMovies) {
            const filteredMovies = allMovies.filter(movie => isMovieValid(movie));
            const sortedMovies = sortMovies(filteredMovies);
            console.log(sortedMovies);
            setMovies(sortedMovies);
        }
    };

    const filters = filterCriteria.map(x => (
        <FormControl key={x.name} className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">{x.name}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id={x.field}
                value={(selectedFacets && selectedFacets[x.field]) || ''}
                onChange={(event) => changeSelectedFacets(x.field, event.target.value)}
            > {
                    x.options.map(opt => (<MenuItem key={opt} value={opt}>{opt}</MenuItem>))
                }

            </Select>
        </FormControl>
    ));

    const sortByFacets = [
        { name: "Rating - High to Low", field: "Rating90" },
        { name: "Rating - Low to High", field: "Rating09" },
        { name: "Title - A to Z", field: "TitleAZ" },
        { name: "Title - Z to A", field: "TitleZA" },
    ];

    const sortByFilter = (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id='SortBy'
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
            >
                {
                    sortByFacets.map(a => (<MenuItem key={a.field} value={a.field}>{a.name}</MenuItem>))
                }
            </Select>
        </FormControl>
    );

    return (
        <Paper className={classes.padding}>
            <Grid container>
                <Grid item lg={7} xs={12}>
                    <TextField className={classes.search}
                        label='Search'
                        value={searchString}
                        onChange={(event) => setSearchString(event.target.value)}
                        fullWidth={true}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={[classes.button, classes.searchBtn]}
                        startIcon={<Search />}
                        onClick={criteriaChanged}
                        disableElevation
                    >
                        Search
                    </Button>
                </Grid>
                <Grid item lg={5} xs={12}>
                    {filters}
                    {sortByFilter}
                </Grid>
            </Grid>
        </Paper>
    );
}

export default FilterSet;