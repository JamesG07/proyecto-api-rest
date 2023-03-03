// Sections
const headerSection = document.querySelector('#header');
const trendingPreviewSection = document.querySelector('#trendingPreview');
const categoriesPreviewSection = document.querySelector('#categoriesPreview');
const genericSection = document.querySelector('#genericList');
const movieDetailSection = document.querySelector('#movieDetail');

// Lists & Containers
const searchForm = document.querySelector('#searchForm');
const movieContainer = document.querySelector('.movie-container');
const trendingMoviesPreviewList = document.querySelector(
  '.trendingPreview-movieList'
);
const categoriesPreviewList = document.querySelector('.categoriesPreview-list');
const movieDetailCategoriesList = document.querySelector(
  '#movieDetail .categories-list'
);
const relatedMoviesContainer = document.querySelector(
  '.relatedMovies-scrollContainer'
);

const categorieslist = document.querySelector('.categories-list');
// Elements
const headerTitle = document.querySelector('.header-title');
const arrowBtn = document.querySelector('.header-arrow');
const headerCategoryTitle = document.querySelector(
  '.header-title--categoryView'
);

const headerContainerlong = document.querySelector('.header-container--long');

const searchFormInput = document.querySelector('#searchForm input');
const searchFormBtn = document.querySelector('#searchBtn');

const trendingBtn = document.querySelector('.trendingPreview-btn');

const containerMovideDetail = document.querySelector(
  '.container-movide-detail'
);
const movieDetailBackground = document.querySelector('.movieDetailBackground');

const movieDetailTitle = document.querySelector('.movieDetail-title');
const movieDetailDescription = document.querySelector(
  '.movieDetail-description'
);
const movieDetailScore = document.querySelector('.movieDetail-score');

//templates
const templateTrendingPreview = document.getElementById(
  'templateTrendingPreview'
).content;

const templateGenericList = document.getElementById(
  'templateGenericList'
).content;

const templateCategoriesPreview = document.getElementById(
  'templateCategoriesPreview'
).content;

const templateCategories =
  document.getElementById('templateCategories').content;

const templateMoviesSimilar = document.getElementById(
  'templateMoviesSimilar'
).content;
