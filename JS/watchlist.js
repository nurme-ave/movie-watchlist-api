import { getMovieDetails, renderMovieDetails } from "./index.js";

document.getElementById('form').style.visibility = 'hidden';

const getLocalStorageData = JSON.parse(localStorage.getItem("watchlist"));

if (getLocalStorageData) {
  const movieData = await getMovieDetails(getLocalStorageData);
  renderMovieDetails(movieData, 'minus');
}
