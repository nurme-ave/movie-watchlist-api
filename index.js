document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = document.getElementById('user-input');
  if (userInput.value) {
    getMovieId(userInput.value);
  } else {
    document.getElementById('no-content').textContent =
    "Please type in the name of the movie you would like to search for.";
  }
});

async function getMovieId(input) {
  let arrMoviesId = [];
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
    getMovieDetails(arrMoviesId);
  } catch (err) {
    // console.error(err);
  }
}

async function getMovieDetails(arr) {
  const arrmovieDetails = [];
  try {
    for (let item of arr) {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${item}&plot=full&type=movie&apikey=f7c0d604`
      );
      movieDetails = await res.json();
      arrmovieDetails.push(movieDetails);
    }
    renderMovieDetails(arrmovieDetails);
  } catch (err) {
    // console.error(err);
  }
}

function renderMovieDetails(details) {
  let detailsHtml = '';
  detailsHtml += details.map( (detail) => {
    return `
    <div id="contentDiv" class="contentDiv">
      <img src='${detail.Poster}'>
      <div class=contentP>
        <p class="title">${detail.Title} <span class="rating">⭐ ${detail.imdbRating}</span></p>
        <div>
          <p class="runtime">${detail.Runtime} <span class="genre">${detail.Genre}</span>
            <button value="${detail.imdbID}" id="add-button" class="add-button"><i class="fa-solid fa-circle-plus"></i> Watchlist</button></p>
        </div>
        <p class="plot">${detail.Plot}</p>
      </div>
    </div>
    `;
  }).join('')
  document.getElementById('content').innerHTML = detailsHtml;
}

document.body.addEventListener('click', (e) => {
  const myWatchlist = [];
  const target = e.target;
  if (target.tagName === 'BUTTON') {
    console.log(target.value)
  }
})
