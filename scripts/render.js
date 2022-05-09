function renderMovieDetails(details, sign='plus') {
  let detailsHtml = '';
  detailsHtml += details
    .map((detail) => {
      const { Poster, Title, imdbRating, Runtime, Genre, imdbID, Plot } = detail;
      return `
    <div id="contentDiv" class="contentDiv">
      <img src='${Poster}'>
      <div class=contentP>
        <p class="title">${Title} <span class="rating">⭐ ${imdbRating}</span></p>
        <p class="runtime">${Runtime} <span class="genre">${Genre}</span>
          <button id="${imdbID}" class="activity-button"><i class="fa-solid fa-circle-${sign}"></i> Watchlist</button></p>
        <p class="plot">${Plot}</p>
      </div>
    </div>
    `;
    })
    .join('');
  document.getElementById('content').innerHTML = detailsHtml;
}

export { renderMovieDetails };
