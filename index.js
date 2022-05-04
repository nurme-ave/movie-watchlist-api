let arrMoviesId = [];
let arrmovieDetails = [];
const myWatchlist = new Set();

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

async function addToWatchlist(e) {
  const target = e.target;
  if (target.tagName === 'BUTTON') {
    myWatchlist.add(target.id);
    console.log(myWatchlist);
    await getMovieDetails(myWatchlist);
  }
}

async function getMovieId(input) {
  arrMoviesId = [];
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${input}&plot=full&type=movie&apikey=f7c0d604`
    );
    const moviesData = await response.json();
    const movies = moviesData.Search;
    movies.map((movie) => {
      const movieId = movie.imdbID;
      arrMoviesId.push(movieId);
    });
    return arrMoviesId;
  } catch (err) {
    // console.error(err);
  }
}

async function getMovieDetails(arr) {
  arrmovieDetails = [];
  try {
    for (let item of arr) {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${item}&plot=full&type=movie&apikey=f7c0d604`
      );
      movieDetails = await res.json();
      arrmovieDetails.push(movieDetails);
    }
    return arrmovieDetails;
  } catch (err) {
    // console.error(err);
  }
}

function renderMovieDetails(details) {
  let detailsHtml = '';
  detailsHtml += details
    .map((detail) => {
      return `
    <div id="contentDiv" class="contentDiv">
      <img src='${detail.Poster}'>
      <div class=contentP>
        <p class="title">${detail.Title} <span class="rating">⭐ ${detail.imdbRating}</span></p>
        <p class="runtime">${detail.Runtime} <span class="genre">${detail.Genre}</span>
          <button id="${detail.imdbID}" class="add-button"><i class="fa-solid fa-circle-plus"></i> Watchlist</button></p>
        <p class="plot">${detail.Plot}</p>
      </div>
    </div>
    `;
    })
    .join('');
  document.getElementById('content').innerHTML = detailsHtml;
}
