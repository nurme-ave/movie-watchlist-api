import { renderMovieDetails } from './render.js';

let myWatchlist = JSON.parse(localStorage.getItem('watchlist'));

document.getElementById('form').style.visibility = 'hidden';
document.getElementById('content').addEventListener('click', removeFromWatchlist);

if (myWatchlist) {
  getAndRenderMovieDetails(myWatchlist);
}

async function removeFromWatchlist(e) {
  const target = e.target;
  if (target.tagName === 'BUTTON') {
    myWatchlist = myWatchlist.filter((item) => item != target.id);

    if (myWatchlist.length != 0) {
      localStorage.setItem('watchlist', JSON.stringify(myWatchlist));
      getAndRenderMovieDetails(myWatchlist);
    } else {
      localStorage.clear();
      document.getElementById('content').innerHTML = `
        <div id="no-content" class="no-content">
          <p class="p-watchlist">Your watchlist is looking a little empty...</p>
          <p class="p-lets-add-some-movies"><i class="fa-solid fa-circle-plus"></i> Let's add some movies!</p>
        </div>
      `;
    }
  }
}

async function getAndRenderMovieDetails(list) {
  const arrMovieDetails = [];

  for (let movie of list) {
    const movieResponse = await fetch(`https://www.omdbapi.com/?i=${movie}&plot=full&type=movie&apikey=f7c0d604`);
    const movieDetails = await movieResponse.json();
    arrMovieDetails.push(movieDetails);
  }
  renderMovieDetails(arrMovieDetails, 'minus');
}
