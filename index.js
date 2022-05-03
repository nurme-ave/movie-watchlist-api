const arrMoviesId = [];
let detailsHtml = '';


document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = document.getElementById('user-input');
  getMovieId(userInput.value);
});

async function getMovieId(input) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${input}&plot=short&type=movie&apikey=f7c0d604`
    );
    const moviesData = await response.json();
    const movies = moviesData.Search;
    movies.map((movie) => {
      let movieId = movie.imdbID;
      console.log(movieId);
      arrMoviesId.push(movieId);

      fetch(`https://www.omdbapi.com/?i=${movieId}&plot=short&type=movie&apikey=f7c0d604`)
      .then(res => res.json())
      .then(data => {
        // renderMovieDetails(data);
        detailsHtml += `
          <div class="contentDiv">
            <img src='${data.Poster}'>
            <p class=contentP>${data.Plot}</p>
          </div>
        `
        document.getElementById('content').innerHTML = detailsHtml;
      })
      
      detailsHtml = '';
    })

  } catch (err) {
    console.error(err);
    document.getElementById('no-content').textContent =
      "Unable to find what you're looking for. Please try another search.";
  }
}

// function renderMovieDetails(details) {
//   let detailsHtml = '';
//   console.log(details);
//   for (let detail of arrMoviesId) {
//     console.log(detail)
//     detailsHtml += `
//         <div class="contentDiv">
//           <img src='${detail.Poster}'>
//           <p class=contentP>${detail.Plot}</p>
//         </div>
//       `;
//   }
//   document.getElementById('content').innerHTML = detailsHtml;
// }
