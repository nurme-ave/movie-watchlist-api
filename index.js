const userInput = document.getElementById('user-input');

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  getMovieDetails(userInput.value)
});

async function getMovieDetails(input) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=f7c0d604&s=${input}`
    );
    const movieDetails = await response.json();
    renderMovieDetails(movieDetails);
  } catch (err) {
    console.error(err);
  }
}


function renderMovieDetails(details) {
  let detailsHtml = '';
  detailsHtml = details.Search.map((detail) => {
    return `
      <div class="contentDiv">
        <img src='${detail.Poster}'>
        <p class=contentP>${detail.Title}</p>
      </div>
    `
  })
  document.getElementById('content').innerHTML = detailsHtml.join('');
}


