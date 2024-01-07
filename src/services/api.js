import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '40632330-75f4a7e3fdd59698a6ace0990';
const imageType = 'photos';
const perPage = 12;

export const requestImg = async (searchQuery, page) => {
  const { data } = await axios.get(
    `?key=${apiKey}&q=${searchQuery}&image_type=${imageType}&per_page=${perPage}&page=${page}`
  );
  return data;
};
