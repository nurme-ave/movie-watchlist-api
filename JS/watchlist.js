import { getMovieDetails, renderMovieDetails } from "./index.js";

document.getElementById('form').style.visibility = 'hidden';

let myWatchlist = JSON.parse(localStorage.getItem("watchlist"));

if (myWatchlist) {
  getAndRenderMovieDetails(myWatchlist);
}

document.getElementById('content').addEventListener('click', removeFromWatchlist);

async function removeFromWatchlist(e) {
  const target = e.target;
  if (target.tagName === 'BUTTON') {
    myWatchlist = myWatchlist.filter(item => item != target.id);

    if (myWatchlist.length != 0) {
      localStorage.setItem('watchlist', JSON.stringify(myWatchlist));
      getAndRenderMovieDetails(myWatchlist);
    } else {
      localStorage.clear()
      document.getElementById('content').innerHTML = `
        <div id="no-content" class="no-content">
          <p class="p-watchlist">Your watchlist is looking a little empty...</p>
          <p class="p-lets-add-some-movies"><i class="fa-solid fa-circle-plus"></i> Let's add some movies!</p>
        </div>
      `
    }
  }
}

async function getAndRenderMovieDetails(list) {
  const movieData = await getMovieDetails(list);
  renderMovieDetails(movieData, 'minus');
}