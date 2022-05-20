import { renderMovieDetails } from "./render.js";

const myWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

const contentEl = document.getElementById('content');

contentEl.addEventListener('click', addToWatchlist);

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = document.getElementById('user-input');
  if (userInput.value) {
    toggleSpinner();
    getMovieIds(userInput.value);
  } else {
    contentEl.textContent =
      'Please type in the name of the movie you would like to search for.';
  }
});

async function getMovieIds(value) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${value}&type=movie&apikey=f7c0d604`);
    const data = await response.json();
    const movieIds = data.Search.map((item) => {
      return item.imdbID;
    })
    toggleSpinner();
    renderMovieDetails(movieIds);
  } catch (err) {
    console.log(err);
    toggleSpinner();
    contentEl.textContent =
      "Unable to find what you're looking for.";
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
  contentEl.classList.toggle('active');
}

