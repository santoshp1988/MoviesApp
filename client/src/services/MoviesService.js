import { get } from './HttpClient';

const baseUrl = process.env.REACT_APP_MOVIES_SERVICE_URL;

const getAllMovies = async () => {
    const movies = await get(`${baseUrl}/api/movies`);
    return movies.map(x => ({
        title: x.title,
        image: x.poster,
        rating: x.rating,
        imdbID: x.id,
        language: x.language,
        location: x.location
    }));
}

const getMovie = async (id) => {
    return await get(`${baseUrl}/api/movies/${id}`);
};

export { getAllMovies, getMovie };