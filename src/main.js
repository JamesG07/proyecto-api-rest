import { API_kEY } from './data/apiKey.js';
('./apiKey.js');
import { navigation } from './navigation.js';
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  Headers: {
    'Content-Type': 'application/json;charset=utg-8',
  },

  params: {
    api_key: API_kEY,
    language: 'es',
  },
});
window.addEventListener('DOMContentLoaded', () => {
  navigation();
});
window.addEventListener('hashchange', navigation, false);

//utils
function createMovies(template, container, arrayMovies) {
  container.innerHTML = '';

  const fragment = document.createDocumentFragment();
  arrayMovies.forEach((movie) => {
    const clone = template.cloneNode(true);

    if (movie.poster_path === null) {
      console.log('no hay imagen');
      clone.querySelector('.movie-img').alt = 'pelicula no encontrada';
    } else {
      clone.querySelector(
        '.movie-img'
      ).src = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
      clone.querySelector('.movie-img').alt = movie.title;

      clone.querySelector('.movie-img').addEventListener('click', () => {
        location.hash = `#movie=${movie.id}`;
      });

      if (movie.vote_average === 0) {
        movie.vote_average = 5;
      }
      clone.querySelector('span').textContent = `${movie.vote_average.toFixed(
        2
      )} ⭐`;
    }

    fragment.appendChild(clone);
  });

  container.appendChild(fragment);
}
function createCategorties(template, container, arrayCategories) {
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();
  arrayCategories.forEach((category) => {
    const clone = template.cloneNode(true);
    clone.querySelector('.category-title').textContent = category.name;
    clone.querySelector('.category-title').id = `id${category.id}`;
    clone.querySelector('.category-title').addEventListener('click', () => {
      location.hash = `category=${category.id}-${category.name}`;
      location.reload();
    });
    fragment.appendChild(clone);
  });
  container.appendChild(fragment);
}
// Llamados a la API
export async function getTrendingMoviesPreview() {
  const { status, data } = await api(`trending/movie/day`);
  createMovies(
    templateTrendingPreview,
    trendingMoviesPreviewList,
    data.results
  );
  if (status !== 200)
    throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
}
export async function getCategoriesPreview(id) {
  const { status, data } = await api('discover/movie', {
    params: {
      with_genres: id,
    },
  });
  if (status !== 200)
    throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
  const dataCategories = data.results;
  createMovies(templateGenericList, genericSection, dataCategories);
}

export async function getCategoriesMovies() {
  const { data } = await api(`/genre/movie/list`);
  const categories = data.genres;
  createCategorties(
    templateCategoriesPreview,
    categoriesPreviewList,
    categories
  );
}

export async function getMoviesBySearch(nameMovie) {
  const { status, data } = await api(`/search/movie`, {
    params: {
      query: `${nameMovie}`,
    },
  });
  if (status !== 200)
    throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
  const categories = data.results;

  createMovies(templateGenericList, genericSection, categories);
}

export async function getTrendingMovies(params) {
  const { status, data } = await api(`trending/all/day`);
  const movies = data.results;
  if (status !== 200)
    throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
  createMovies(templateGenericList, genericSection, movies);
}

export async function getMovieById(id) {
  const { status, data } = await api(`movie/${id}`);
  if (status !== 200)
    throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
  console.log(data);
  movieDetailTitle.textContent = data.title;
  movieDetailScore.textContent = data.vote_average;
  movieDetailDescription.textContent = data.overview;

  const imgUrl = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
  headerSection.style.backgroundImage = `
  linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.35) 19.27%, 
    rgba(0, 0, 0, 0) 29.17%
    ),
  url(${imgUrl})
  `;

  createCategorties(templateCategories, categorieslist, data.genres);
  getRelateMoviesId(id);
}

export async function getRelateMoviesId(id) {
  const { data } = await api(`movie/${id}/similar`);
  const dataMovies = data.results;

  createMovies(templateMoviesSimilar, movieContainer, dataMovies);
}
