const fetchController = new AbortController();

async function getMovieId(input) {
  const arrMoviesId = [];
  
  try {
    const { signal } = fetchController;
    let timeOut = setTimeout( () => {
      fetchController.abort();
      console.log(fetchController.signal.aborted);
    }, 1000);

    const response = await fetch(
      `https://www.omdbapi.com/?s=${input}&plot=full&type=movie&apikey=f7c0d604`, { signal }
    );
    const moviesData = await response.json();
    console.log(moviesData);
    console.log('got the data back');
    console.log(fetchController.signal.aborted);

    clearTimeout(timeOut);
    const movies = moviesData.Search;
    movies.map((movie) => {
      const movieId = movie.imdbID;
      arrMoviesId.push(movieId);
    });
    return arrMoviesId;
  } catch (err) {
    displayErrorMessage(err);
  }
}

async function getMovieDetails(arr) {
  const arrmovieDetails = [];
  try {
    const { signal } = fetchController;
    let timeOut = setTimeout( () => {
      fetchController.abort();
      console.log(fetchController.signal.aborted);
    }, 1000);

    for (let item of arr) {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${item}&plot=full&type=movie&apikey=f7c0d604`, { signal }
      );
      const movieDetails = await res.json();
      console.log('got the data back here too');
      console.log(fetchController.signal.aborted);

      clearTimeout(timeOut);
      arrmovieDetails.push(movieDetails);
    }
    return arrmovieDetails;
  } catch (err) {
    displayErrorMessage(err);
  }
}

function displayErrorMessage(errMsg) {
  console.log(errMsg);
  document.getElementById('content').textContent =
    'Please try again.';
}

export { getMovieId, getMovieDetails, displayErrorMessage };