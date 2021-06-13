import React from 'react';
import { useState, createContext } from 'react';

export const MoviesContext = createContext({});

export const MoviesProvider = (props) => {
    const [movies, setMovies] = useState();
    const [allMovies, setAllMovies] = useState();
    const [searchString, setSearchString] = useState('')
    const [selectedFacets, setSelectedFacets] = useState({})
    const [sortBy, setSortBy] = useState('Rating90');

    return (<MoviesContext.Provider value={{
        movies, setMovies,
        allMovies, setAllMovies,
        searchString, setSearchString,
        selectedFacets, setSelectedFacets,
        sortBy, setSortBy
    }}>
        {props.children}
    </MoviesContext.Provider>)
}