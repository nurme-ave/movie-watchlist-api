import { getMovieDetails, renderMovieDetails } from "./index.js";

document.getElementById('form').style.visibility = 'hidden';

let myWatchlist = JSON.parse(localStorage.getItem("watchlist"));

if (myWatchlist) {
  const movieData = await getMovieDetails(myWatchlist);
  renderMovieDetails(movieData, 'minus');
}

document.getElementById('content').addEventListener('click', removeFromWatchlist);

async function removeFromWatchlist(e) {
  const target = e.target;
  if (target.tagName === 'BUTTON') {
    myWatchlist = myWatchlist.filter(item => item != target.id);
  }
  localStorage.setItem('watchlist', JSON.stringify(myWatchlist));
  const movieData = await getMovieDetails(myWatchlist);
  renderMovieDetails(movieData, 'minus');
}
