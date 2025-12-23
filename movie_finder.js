const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=2fe00bf4&s=";
const API_URL_SEARCH = "http://www.omdbapi.com/?apikey=2fe00bf4&i=";

var search_input = document.getElementById("search-input");
var card = document.getElementsByClassName("movie-cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click",function(){
    console.log(search_input.value);
    const query = search_input.value;
    if(query){
        getMovies(API_URL+query);
    }
});

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.Search);
    }

function showMovies(movies){
    card.innerHTML="";
    movies.forEach(async function(movie) {
        const movieData = await fetch(API_URL_SEARCH+movie.imdbID);
        const movieDataobj = await movieData.json();
        movie_display(movieDataobj);
    });
}


function movie_display(imovie){
    const movieElm = document.createElement("div");

    movieElm.innerHTML = `
        <div class="card">
            <img src="${imovie.Poster}" alt="Poster" width="300" height="300"/>

            <div class="movie-description">
                <p><strong>Title:</strong> ${imovie.Title}</p>
                <p><strong>Rating:</strong> ${imovie.imdbRating}</p>
                <p><strong>Director:</strong> ${imovie.Director}</p>
                <p><strong>Released:</strong> ${imovie.Released}</p>
                <p><strong>Genre:</strong> ${imovie.Genre}</p>
            </div>
        </div>
    `;

    card.appendChild(movieElm);
}

