document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = document.getElementById('user-input');
  getMovieId(userInput.value);
});

async function getMovieId(input) {
  const arrMoviesId = [];
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${input}&plot=short&type=movie&apikey=f7c0d604`
    );
    const moviesData = await response.json();
    const movies = moviesData.Search;
    movies.map((movie) => {
      let movieId = movie.imdbID;
      console.log(movieId);
      arrMoviesId.push(movieId);
    });
    getMovieDetails(arrMoviesId);
  } catch (err) {
    document.getElementById('no-content').innerHTML =
    "Unable to find what you're looking for. Please try another search.";
    console.error(err);
  }
}

async function getMovieDetails(arr) {
  console.log(arr);
  const arrmovieDetails = [];
  try {
    for (let item of arr) {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${item}&plot=short&type=movie&apikey=f7c0d604`
      );
      movieDetails = await res.json();
      arrmovieDetails.push(movieDetails);
    }
    console.log(arrmovieDetails);
    renderMovieDetails(arrmovieDetails);
  } catch (err) {
    console.error(err);
    document.getElementById('no-content').innerHTML =
      "Unable to find what you're looking for. Please try another search.";
  }
}

function renderMovieDetails(details) {
  let detailsHtml = '';
  console.log(details);
  for (let detail of details) {
    detailsHtml += `
      <div class="contentDiv">
        <img src='${detail.Poster}'>
        <p class=contentP>${detail.Plot}</p>
      </div>
    `;
  }
  document.getElementById('content').innerHTML = detailsHtml;
}
