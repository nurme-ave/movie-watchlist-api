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
  const arrMoviesId = [];
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${input}&plot=short&apikey=f7c0d604`
    );
    const moviesData = await response.json();
    const movies = moviesData.Search;
    movies.map((movie) => {
      let movieId = movie.imdbID;
      console.log(movieId);
      arrMoviesId.push(movieId);
    });
    console.log(arrMoviesId)
    getMovieDetails(arrMoviesId);
  } catch (err) {
    console.error(err);
  }
}

async function getMovieDetails(arr) {
  console.log(arr);
  const arrmovieDetails = [];
  try {
    for (let item of arr) {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${item}&plot=short&apikey=f7c0d604`
      );
      movieDetails = await res.json();
      arrmovieDetails.push(movieDetails);
    }
    console.log(arrmovieDetails);
    renderMovieDetails(arrmovieDetails);
  } catch (err) {
    console.error(err);
  }
}

function renderMovieDetails(details) {
  let detailsHtml = '';
  console.log(details);
  for (let detail of details) {
    detailsHtml += `
      <div class="contentDiv">
        <img src='${detail.Poster}'>
        <div class=contentP>
          <p>Title: ${detail.Title}</p>
          <p>Runtime: ${detail.Runtime}</p>
          <p>Rating: ${detail.imdbRating}</p>
          <p>Genres: ${detail.Genre}</p>
          <p>${detail.Plot}</p>
        </div>
      </div>
    `;
  }
  document.getElementById('content').innerHTML = detailsHtml;
}
