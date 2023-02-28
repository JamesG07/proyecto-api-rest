import {
  getCategoriesMovies,
  getTrendingMoviesPreview,
  getCategoriesPreview,
  getMoviesBySearch,
  getTrendingMovies,
} from './main.js';

searchFormBtn.addEventListener('click', () => {
  location.hash = `#search=${searchFormInput.value}`;
});

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
  history.back();
});

export function navigation() {
  // console.log(location);

  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }
}

function homePage() {
  // console.log('HOME ');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

  getCategoriesMovies();
  getTrendingMoviesPreview();
}
function trendsPage(params) {
  // console.log('TRENDS');
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  headerCategoryTitle.textContent = 'Tendencias';
  getTrendingMovies();
}
function searchPage(params) {
  // console.log('SEARCH');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, searchValue] = location.hash.split('=');
  const query = decodeURI(searchValue).trim();
  headerCategoryTitle.textContent = `Estas buscando "${query}"`;
  getMoviesBySearch(query);
}
function movieDetailsPage(params) {
  // console.log('MOVIES');
  headerSection.classList.add('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
}
function categoriesPage(params) {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, categoryData] = location.hash.split('=');

  const [id, name] = categoryData.split('-');
  const newName = decodeURI(name);
  headerCategoryTitle.textContent = newName;
  window.scroll(0, 0);
  getCategoriesPreview(id);
}