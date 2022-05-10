async function getMoviesData(input) {
  const fetchController = new AbortController();
  const arrMovieIds = [];
  const arrMovieDetails = [];

  const { signal } = fetchController;

  let timer = setTimeout( () => {
    fetchController.abort();
  }, 10000)

  try {
    const moviesResponse = await fetch(`https://www.omdbapi.com/?s=${input}&plot=full&type=movie&apikey=f7c0d604`, { signal });
    const moviesObj = await moviesResponse.json();
    const moviesArr = moviesObj.Search;

    moviesArr.map((movieId) => {
      arrMovieIds.push(movieId.imdbID);
    });

    for (let movie of arrMovieIds) {
      const movieResponse = await fetch(`https://www.omdbapi.com/?i=${movie}&plot=full&type=movie&apikey=f7c0d604`, { signal });
      const movieDetails = await movieResponse.json();
      arrMovieDetails.push(movieDetails);
    }
    clearTimeout(timer);
    return arrMovieDetails;
  } catch (err) {
    if (err.name === 'AbortError') {
      document.getElementById('content').innerHTML = `
      <div class="error-messages-div">
        <p>Sorry, it took too long to receive a response.</p>
        <p>Please consider narrowing your search by using more keywords.</p>
      </div>`
    } else {
      document.getElementById('content').textContent = 'Please check your spelling.'
    }
  }
}

export { getMoviesData };