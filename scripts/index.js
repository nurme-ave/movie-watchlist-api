import { getMovieId, getMovieDetails, displayErrorMessage } from './api.js';
import { renderMovieDetails } from './render.js';

const myWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

document.getElementById('form').style.visibility = 'visible';
document.getElementById('content').addEventListener('click', addToWatchlist);

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const userInput = document.getElementById('user-input');
  if (userInput.value) {
    toggleSpinner();
    displaySearchResults(userInput.value);
  } else {
    document.getElementById('content').textContent =
      'Please type in the name of the movie you would like to search for.';
  }
});

async function displaySearchResults(value) {
  try {
    const getId = await getMovieId(value);
    const getDetails = await getMovieDetails(getId);
    toggleSpinner();
    renderMovieDetails(getDetails);
  } catch (err) {
    displayErrorMessage(err);
  }
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

function toggleSpinner() {
  document.getElementById('green-spinner').classList.toggle('active');
  document.getElementById('content').classList.toggle('active');
}