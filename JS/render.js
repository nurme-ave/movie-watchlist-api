function renderMovieDetails(details, sign='plus') {
  let detailsHtml = '';
  detailsHtml += details
    .map((detail) => {
      return `
    <div id="contentDiv" class="contentDiv">
      <img src='${detail.Poster}'>
      <div class=contentP>
        <p class="title">${detail.Title} <span class="rating">⭐ ${detail.imdbRating}</span></p>
        <p class="runtime">${detail.Runtime} <span class="genre">${detail.Genre}</span>
          <button id="${detail.imdbID}" class="add-button"><i class="fa-solid fa-circle-${sign}"></i> Watchlist</button></p>
        <p class="plot">${detail.Plot}</p>
      </div>
    </div>
    `;
    })
    .join('');
  document.getElementById('content').innerHTML = detailsHtml;
}

export { renderMovieDetails };
