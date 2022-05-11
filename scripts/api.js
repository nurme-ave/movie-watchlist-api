async function getMovieId(input) {
  const arrMoviesId = [];
  const firstFetchController = new AbortController();
  const firstSignal = firstFetchController.signal;

  let timer1 = setTimeout( () => {
    firstFetchController.abort();
    console.log('hello1')
  }, 20000)

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${input}&plot=full&type=movie&apikey=f7c0d604`, { signal: firstSignal }
    );
    const moviesData = await response.json();
    const movies = moviesData.Search;
    movies.map((movie) => {
      const movieId = movie.imdbID;
      arrMoviesId.push(movieId);
    });
    clearTimeout(timer1);
    console.log('timer cleared #1')
    return arrMoviesId;
  } catch (err) {
    displayErrorMessage(err);
  }
}

async function getMovieDetails(arr) {
  const arrmovieDetails = [];
  const secondFetchController = new AbortController();
  const secondSignal = secondFetchController.signal;

  let timer2 = setTimeout( () => {
    secondFetchController.abort();
    console.log('hello2')
  }, 20000)

  try {
    for (const item of arr) {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${item}&plot=full&type=movie&apikey=f7c0d604`, { signal: secondSignal }
      );
      const movieDetails = await res.json();
      arrmovieDetails.push(movieDetails);
    }
    clearTimeout(timer2);
    console.log('timer cleared #2')
    return arrmovieDetails;
  } catch (err) {
    displayErrorMessage(err);
  }
}

function displayErrorMessage(errMsg) {
  console.log(errMsg);
  console.log(errMsg.name);

  if (errMsg.name === 'AbortError') {
    document.getElementById('content').innerHTML = `
    <div class="error-messages-div">
      <p>Sorry, the database took too long to receive a response.</p>
      <p>Please hit 'ENTER' again.</p>
    </div>`
  } else {
    document.getElementById('content').textContent = 'Please check your input for spelling mistakes.'
  }
}

export { getMovieId, getMovieDetails, displayErrorMessage };