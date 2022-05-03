function render(name) {
  arrIdFilms = [];
  console.log(renderFilm);
  
  fetch(`https://www.omdbapi.com/?s=${name}&plot=full&apikey=5eedcfcf`)
    .then((res) => res.json())
    .then((data) => {
      let films = data.Search;
      films.map((film) => {
        let id = film.imdbID;
        arrIdFilms.push(id);
        fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=5eedcfcf`)
          .then((res) => res.json())
          .then((data) => {
            let filmBlock = `
                          <div class="imgAndSection">
                              <img src="${data.Poster}" class="imgFilm"/>
                              <section class="sectionFilm">
                                  <div class="nameAndRating">
                                      <h4>${data.Title}</h4>
                                      <img src="img/star.png" class="star"/>
                                      <p class="rating">${data.imdbRating}</p>
                                  </div>
                                  <div class="filmInfo">
                                      <p class="time">${data.Runtime}</p>
                                      <p>${data.Genre}</p>
                                      <div class="btn-watchList" id="btn-watchList${id}">
                                          <img src="img/icon_plus.png"/>
                                          <p>Watchlist</p>
                                      </div>
                                  </div>
                                  <p class="description">
                                      ${data.Plot}
                                  </p>
                              </section>
                          </div>
                          <hr class="line"/>
                      `;
          });
      });
    });
}
