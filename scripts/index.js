const myWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

document.getElementById('form').style.visibility = 'visible';
document.getElementById('content').addEventListener('click', addToWatchlist);

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const userInput = document.getElementById('user-input');
  if (userInput.value) {
    toggleSpinner();
    getMovieIds(userInput.value);
  } else {
    document.getElementById('content').textContent =
      'Please type in the name of the movie you would like to search for.';
  }
});

async function getMovieIds(value) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${value}&type=movie&apikey=f7c0d604`);
    const data = await response.json();
    const searchList = data.Search.map((item) => {
      return item.imdbID;
    })
    toggleSpinner();
    renderMovieDetails(searchList);
  } catch (err) {
    console.log(err);
    toggleSpinner();
    document.getElementById('content').textContent =
      'Please check your input for spelling.';
  }
}

function renderMovieDetails(details, sign='plus') {
  const arrmovieDetails = [];
  
  try {
    details.map((id) => {
      fetch(`https://www.omdbapi.com/?i=${id}&plot=full&type=movie&apikey=f7c0d604`)
        .then(response => response.json())
        .then(data => {
          arrmovieDetails.push(data);
          let detailsHtml = '';
          detailsHtml += arrmovieDetails.map((detail) => {
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

function addToWatchlist(e) {
  const target = e.target;
  if (target.tagName === 'BUTTON') {
    if (!myWatchlist.includes(target.id)) {
      myWatchlist.push(target.id);
    }
  }
  localStorage.setItem('watchlist', JSON.stringify(myWatchlist));
}

function toggleSpinner() {
  document.getElementById('green-spinner').classList.toggle('active');
  document.getElementById('content').classList.toggle('active');
}

export { renderMovieDetails };