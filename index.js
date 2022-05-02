async function getMovieDetails() {
  try {
    const response = await fetch(
      'http://www.omdbapi.com/?apikey=f7c0d604&s=lego'
    );
    const movieDetails = await response.json();
    renderMovieDetails(movieDetails);
  } catch (err) {
    console.error(err);
  }
}

getMovieDetails();

function renderMovieDetails(details) {
  console.log(details.Search.Poster)
  console.log(details.Search)
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


