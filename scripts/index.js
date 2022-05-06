import { getMovieId, getMovieDetails } from './api.js';
import { renderMovieDetails } from './render.js';

const myWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

document.getElementById('form').style.visibility = 'visible';
document.getElementById('content').addEventListener('click', addToWatchlist);

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = document.getElementById('user-input');
  if (userInput.value) {
    displaySearchResults(userInput.value);
  } else {
    document.getElementById('no-content').textContent =
      'Please type in the name of the movie you would like to search for.';
  }
});

async function displaySearchResults(value) {
  const getId = await getMovieId(value);
  const getDetails = await getMovieDetails(getId);
  renderMovieDetails(getDetails);
}

function addToWatchlist(e) {
  const target = e.target;
  if (target.tagName === 'BUTTON') {
    if (!myWatchlist.includes(target.id)) {
      myWatchlist.push(target.id);
    }
  }
  localStorage.setItem('watchlist', JSON.stringify(myWatchlist));
}
