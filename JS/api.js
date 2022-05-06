async function getMovieId(input) {
  const arrMoviesId = [];
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
    console.error(err);
  }
}

async function getMovieDetails(arr) {
  const arrmovieDetails = [];
  try {
    for (let item of arr) {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${item}&plot=full&type=movie&apikey=f7c0d604`
      );
      const movieDetails = await res.json();
      arrmovieDetails.push(movieDetails);
    }
    return arrmovieDetails;
  } catch (err) {
    console.error(err);
  }
}

export { getMovieId, getMovieDetails };
