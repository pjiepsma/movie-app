import axiosInstance from './axios';

export const fetchPopularMovies = async (page: number) => {
    try {
        const response = await axiosInstance.get(`/movie/popular`, {
            params: {
                language: 'en-US',
                page: page,
            },
        });
        return response.data.results;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const fetchMovieDetails = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/movie/${id}`, {
            params: {
                language: 'en-US',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchSearchedMovies = async (query: string, page: number) => {
    const encodedQuery = encodeURI(query);
    try {
        const response = await axiosInstance.get(`/search/movie`, {
            params: {
                query: encodedQuery,
                include_adult: false,
                language: 'en-US',
                page: page,
            },
        });
        return response.data.results;
    } catch (error) {
        throw error;
    }
};


