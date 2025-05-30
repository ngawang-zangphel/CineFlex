'use strict'

/***********************************************
 * LIST OF EXISTING MOVIES
**********************************************/
const descContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.';

const movies = [
    {
        id: 1,
        name: 'intersteller',
        rating: 4.6,
        description: descContent,
        genre: ['action', 'scifi', 'drama'],
        image: './image/intersteller.jpg',
        releaseYear: 2014
    },
    {
        id: 2,
        name: 'bad boys',
        rating: 2.7,
        description: descContent,
        genre: ['action', 'comedy'],
        image: './image/bad-boys.jpg',
        releaseYear: 2007
    },
    {
        id: 3,
        name: 'inception',
        rating: 4.2,
        description: descContent,
        genre: ['action', 'scifi', 'fantacy'],
        image: '',
        releaseYear: 2010
    },
    {
        id: 4,
        name: 'Bahubali',
        rating: 3.8,
        description: descContent,
        genre: ['action', 'drama'],
        image: '',
        releaseYear: 2015
    },
    {
        id: 5,
        name: 'Fast & Furious 2',
        rating: 3.4,
        description: descContent,
        genre: ['action', 'drama'],
        image: '',
        releaseYear: 2004
    }
]

/***********************************************
 * Rendering All Movies inside movie-list-container in the UI
 *  * Methods: 
 * 1. Foreach
 ***********************************************/
const movieListSection = document.getElementById('movie-list-container');

function renderAllMovies(movieList) {
    //Remove the previous values and display new contents to prevent duplication.
    movieListSection.innerHTML = '';
    movieList.forEach((movie) => {
        const movieCard = `
            <div class="movie-card">
                <div class="movie-banner">
                    <img src="${displayMovieBanner(movie?.image)}" width="240" height="140">
                </div>
                <div class="movie-title">
                    <h2>${formatMovieName(movie?.name)}</h2>
                </div>
                <div class="movie-description">
                    <p>${formatMovieDescription(movie?.description)}</p>
                </div>
                <div class="movie-genre">
                    <b>Genre:</b> <text>${formatGenre(movie?.genre)}</text>
                </div>
                <div class="movie-release-year">
                    <b>Release Year:</b> <text>${movie?.releaseYear}</text>
                </div>
                <div class="movie-rating">
                    <b>Rating:</b><span class="star-rating">${displayStarRatings(movie?.rating)}</span>
                </div>
                <div class="movie-actions">
                    <button onclick="showMovieDetails(${movie?.id})">Details</button>
                    <button onclick="deleteMovie(${movie?.id})">Delete</button>
                </div>
            </div>
        `;
        // Passing directly movie will return as movie is an object and html knows simple type only such as string, numeric
        movieListSection.insertAdjacentHTML('beforeend', movieCard);
    });
}

renderAllMovies(movies);

/***********************************************
 * Format Movie Name
 *  * Methods: 
 * 1. Map
 * 2. Splot.
 * 3. At
 * 4. Substring
 * 5. Join
 * 6. toUpperCase and toLowerCase
 ***********************************************/
function formatMovieName(name) {
    //Get all the words in the Movie Name
    const movieNameWords = name.split(' ');
    const formmatedWordArray = movieNameWords.map((word) => {
        //at-> return index character from that string
        // substring -> returns the value from given index till end
        const fChar = word.at(0).toUpperCase();   
        const restChar = word.substring(1).toLowerCase();
        return fChar + restChar;
    });
    return formmatedWordArray.join(' ');
}

/***********************************************
 * Format Movie Description by showing first 100 character on starting
 *  * Methods: 
 * 1. Substring
 * 2. Flatmap: 
 *  - calls map method on that array to transform and then flat method to flatten the array
 ***********************************************/
function formatMovieDescription(desc) {
    return desc.substring(0, 100).concat('...');
}

function formatGenre(genres) {
    return genres.flatMap((genre) => {
        return ' ' + genre.at(0).toUpperCase() + genre.slice(1).toLowerCase();
    })
}

/***********************************************
 * Display Movie Ratings to show star instead of numbers
 ***********************************************/
function displayStarRatings(rating) {
    if (typeof rating !== "number" || rating < 0 || rating > 5) {
        console.log("Invalid Rating;");
        return '';
    }

    let starString = '';
    for(let i = 0; i < 5; i++) {
        if (i < rating) {
            starString += '\u2605'; //unit code for filled stars
        } else {
            starString += '\u2606'; //unit code for filled stars
        }
    };
    return starString;
}

/***********************************************
 * Default Image URL
 ***********************************************/
function displayMovieBanner(image) {
    return image || './image/not-found-image.jpg';
}

/***********************************************
 * Sort Movie List based on RATING or RELEASE YEAR
 * * Methods:
 * 1. sort:
 *  - swap current and next item then return positive number else if not then negative number
 *  - modify original array
***********************************************/
document.getElementById('sort-movie-by-rating').addEventListener('click', sortMoviesByRating);
document.getElementById('sort-movie-by-release-year').addEventListener('click', sortMoviesByReleaseYear);

let sortAccending = true;
function sortMoviesByRating() {
    if (sortAccending) {
        movies.sort((curr, next) => curr?.rating - next?.rating);
    } else {
        movies.sort((curr, next) => next?.rating - curr?.rating);
    };
    sortAccending = !sortAccending;
    //Re-render the UI with sorted movies.
    renderAllMovies(movies);
}
function sortMoviesByReleaseYear() {
    if (sortAccending) {
        movies.sort((curr, next) => curr?.releaseYear - next?.releaseYear);
    } else {
        movies.sort((curr, next) => next?.releaseYear - curr?.releaseYear);
    };
    sortAccending = !sortAccending;
    //Re-render the UI with sorted movies.
    renderAllMovies(movies);
}

/***********************************************
 * Search Movie By Name
 * Methods:
 *  1. filter
 *  2. Includes
***********************************************/
document.getElementById('search-movie-btn').addEventListener('click', searchMovies);
function searchMovies() {
    const searchText = document.getElementById('search-movie-input')?.value;
    const searchedMovies = movies.filter(movie => movie?.name?.toLowerCase().includes(searchText));
    renderAllMovies(searchedMovies);
}

/***********************************************
 * Filter by Genre
 * Methods:
 *  1. filter
 *  2. Includes
***********************************************/
function filterByGenre(selectedRadioButton) {
    const selectedGenre = selectedRadioButton?.value;
    let filteredMovies = [];
    if (selectedGenre === 'all') {
        filteredMovies = movies;
    } else {
        filteredMovies = movies.filter(movie => movie?.genre?.includes(selectedGenre));
    };
    renderAllMovies(filteredMovies);

}

/***********************************************
 * Show Movie Details
 * Methods:
 *  1. find
 *      - returns first matching element.
***********************************************/

function showMovieDetails(movieId) {
    showMovieDetailsModal();

     let selectedMovie = movies.find((movie) => movie?.id === movieId);
    let movieDetailHTML = `
        <div class="selected-movie-details">
            <div class="selected-movie-image">
                <img src="${displayMovieBanner(selectedMovie?.image)}" width="100%" height="240">
            </div>
            <div class="selected-movie-name">
                <h2>${formatMovieName(selectedMovie?.name)}</h2>
            </div>
            <div class="selected-movie-description">
                <p>${formatMovieDescription(selectedMovie?.description)}</p>
            </div>
            <div class="selected-movie-other-details">
                <div class="selected-movie-release">
                    <b>Release Year: </b>
                    <text>${selectedMovie?.releaseYear}</text>
                </div>
                <div class="selected-movie-rating">
                    <b>Rating: (${selectedMovie?.rating})</b>
                    <text class="star-rating">${displayStarRatings(selectedMovie?.rating)}</text>
                </div>
            </div>
            <div class="selected-movie-genre">
                <b>Genre:</b>
                <text>${formatGenre(selectedMovie?.genre)}</text>
            </div>
        </div>
    `;

    const container = document.getElementById('selected-movie-detail-container');
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', movieDetailHTML);
}

function showMovieDetailsModal() {
    document.getElementById('movie-detail-section').classList.remove('hidden');
}

function hideMovieDetailsModal() {
    document.getElementById('movie-detail-section').classList.add('hidden');
}

/***********************************************
 * Delete Movie from Movies Array
 *  show confirm window to see if he really wants to delete or not.
 * Methods:
 *  1. find
 *      - returns first matching element.
 * 2. Splice
 *      - modifies original array
 * 3. findIndex
 *      - index of an item
***********************************************/
function deleteMovie(id) {
    const movieToDelete = movies.find(movie => movie?.id === id);
    const message = `Do you really want to delete movie: '${movieToDelete?.name}'`;
    let toDelete = confirm(message);

    if (toDelete) {
        let index = movies.findIndex(movie => movie?.id === id);
        movies.splice(index, 1);
        renderAllMovies(movies);
    };
}

/***********************************************
 * Create a movie
 * Methods:
 *  1. 
***********************************************/
document.getElementById('create-movie-form').addEventListener('submit', createMovie);

function createMovie(event) {
    event.preventDefault();
    let newMovie = {};
    newMovie = readFormData(newMovie);
    movies.push(newMovie);
    hideCreateMovieModal();
    renderAllMovies(movies);
}

function readFormData(movie) {
    movie.name = readInputFieldValue('name');
    movie.description = readInputFieldValue('desc');
    movie.rating = +readInputFieldValue('rating');
    movie.releaseYear = +readInputFieldValue('releaseYear');
    movie.genre = getSelectedCheckboxValue('genre');
    return movie;
}

function getSelectedCheckboxValue(elementName) {
    const selectedValue = [];
    const checkboxes = document.getElementsByName(elementName);
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedValue.push(checkbox?.value);
        };
    })
    return selectedValue;
}

function readInputFieldValue(id) {
    return document.getElementById(id).value;
}

function showCreateMovieModal() {
    // since using className to select and not id
    document.querySelector('.create-movie-section').classList.remove('hidden');
}

function hideCreateMovieModal() {
    // since using className to select and not id
    document.querySelector('.create-movie-section').classList.add('hidden');
}