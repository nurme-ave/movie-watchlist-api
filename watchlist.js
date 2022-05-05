const someList = JSON.parse(localStorage.getItem("watchlist"));


async function getMovieDetails(arr) {
  arrmovieDetails = [];
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

getMovieDetails(someList);


function renderMovieDetails(details) {
  let detailsHtml = '';
  detailsHtml += details
    .map((detail) => {
      return `
    <div id="contentDiv" class="contentDiv">
      <img src='${detail.Poster}'>
      <div class=contentP>
        <p class="title">${detail.Title} <span class="rating">⭐ ${detail.imdbRating}</span></p>
        <p class="runtime">${detail.Runtime} <span class="genre">${detail.Genre}</span>
          <button id="${detail.imdbID}" class="add-button"><i class="fa-solid fa-circle-minus"></i> Watchlist</button></p>
        <p class="plot">${detail.Plot}</p>
      </div>
    </div>
    `;
    })
    .join('');
  document.getElementById('content').innerHTML = detailsHtml;
}