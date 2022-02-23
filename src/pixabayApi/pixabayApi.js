import axios from 'axios';

const API_KEY = '24782345-074c184871a8ba5a263dbeb7d';

axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (query, currentPage) => {
  const { data } = await axios.get(
    `/?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return data;
};

export default fetchImages;
