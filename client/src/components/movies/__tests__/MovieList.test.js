import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import MovieList from '../MovieList';

describe('MovieList', () => {
    const movies = [
        {
            title: "I am Legend",
            image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_SX300.jpg",
            rating: 9.1,
            imdbID: 1
        },
        {
            title: "I am Legend 2",
            image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_SX300.jpg",
            rating: 7.5,
            imdbID: 2
        }];

    beforeEach(() => {
        render(<MovieList movies={movies} />);
    });

    afterEach(() => {
        cleanup();
    })

    it('should display all movies', () => {
        expect(screen.getAllByRole("heading")).toHaveLength(2);
    });

    it('should show no movies found', () => {
        cleanup();
        render(<MovieList movies={[]} />);
        expect(screen.getByText("No movies found!")).toBeInTheDocument();
    });

    it('matches snapshot', async () => {
        const { asFragment } = render(<MovieList movies={movies} />);
        expect(asFragment(<MovieList movies={movies} />)).toMatchSnapshot()
    });
});