let detailsHtml = '';

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = document.getElementById('user-input');
  getMovieId(userInput.value);
});

function getMovieId(input) {
  const arrMoviesId = [];
  const arrmovieDetails = [];

  fetch(
    `https://www.omdbapi.com/?s=${input}&plot=short&type=movie&apikey=f7c0d604`
  )
    .then((res) => res.json())
    .then((moviesData) => {
      let movies = moviesData.Search;
      movies.map((movie) => {
        let movieId = movie.imdbID;
        console.log(movieId);
        arrMoviesId.push(movieId);
        fetch(
          `https://www.omdbapi.com/?i=${movieId}&plot=short&type=movie&apikey=f7c0d604`
        )
          .then((res) => res.json())
          .then((detail) => {
            detailsHtml += `
            <div class="contentDiv">
              <img src='${detail.Poster}'>
              <p class=contentP>${detail.Plot}</p>
            </div>
          `;
            });
            document.getElementById('content').innerHTML = detailsHtml;
        });
      });
}
