import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import Movie from '../Movie';

describe('Movie', () => {
    const movie = { title: "I am Legend", image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_SX300.jpg", rating: 9.1 };

    beforeEach(() => {
        render(<Movie movie={movie} />);
    });

    afterEach(() => {
        cleanup();
    })

    it('should render title', () => {
        expect(screen.getByText(movie.title)).toBeInTheDocument();
    });

    it('renders correct image', async () => {
        expect(screen.getByAltText(movie.title)).toHaveAttribute('src', movie.image)
    });

    it('matches snapshot', async () => {
        const { asFragment } = render(<Movie movie={movie} />);
        expect(asFragment(<Movie movie={movie} />)).toMatchSnapshot()
    });
});