function renderMovieDetails(details, sign='plus') {
  const arrMovieDetails = [];
  
  try {
    details.map((id) => {
      fetch(`https://www.omdbapi.com/?i=${id}&plot=full&type=movie&apikey=f7c0d604`)
        .then(response => response.json())
        .then(movieDetails => {
          arrMovieDetails.push(movieDetails);
          let detailsHtml = '';
          detailsHtml = arrMovieDetails.map((detail) => {
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
        })
    })
  } catch (err) {
    console.log(err);
  }
}

export { renderMovieDetails };