import axios from 'axios';

const API_KEY = '9cca312caffd11f4ae9f11244d585025';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const fetchMovies = async page => {
  const response = await axios(`trending/movie/day`, {
    params: {
      page,
      api_key: API_KEY,
    },
  });

  return response.data.results;
};

export default fetchMovies;
