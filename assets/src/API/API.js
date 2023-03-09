import axios from "axios";

const BASE_URL = `https://pixabay.com/api/`
 const KEY = `32776418-aa374a2a10c573564f087ae5a`;
 const parameter = `?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12`;

 export async function getPictures(searchQuery, page) {
    try {
      const response = await axios.get(
        `${BASE_URL}${parameter}&q=${searchQuery}&page=${page}`
      );
      return response;
      
   } catch (error) {
      throw new Error(error);
    }
  }