import { API_kEY } from './data/apiKey.js';
import { navigation, inifiniteScroll } from './navigation.js';
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
function likedMoviesList() {
  const item = JSON.parse(localStorage.getItem('liked_movies'));
  let movies;
  if (item) {
    movies = item;
  } else {
    movies = {};
  }

  return movies;
}

function likeMovie(movie) {
  const likedMovies = likedMoviesList();
  if (likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
  } else {
    likedMovies[movie.id] = movie;
  }

  localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
}

let page = 1;
let maxPage = null;
window.addEventListener('DOMContentLoaded', () => {
  navigation();
});
window.addEventListener('hashchange', navigation, false);

window.addEventListener('DOMContentLoaded', () => {
  navigation();
});

window.addEventListener('scroll', inifiniteScroll, false);

//utils
function createMovies(
  template,
  container,
  arrayMovies,
  { lazyLoad = false, clean = true } = {}
) {
  if (clean) {
    container.innerHTML = '';
  }

  const fragment = document.createDocumentFragment();
  arrayMovies.forEach((movie) => {
    const clone = template.cloneNode(true);
    if (movie.poster_path === null) {
      clone.querySelector('.movie-img').alt = 'pelicula no encontrada';
    } else {
      clone
        .querySelector('.movie-img')
        .setAttribute(
          lazyLoad ? 'data-img' : 'src',
          `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
        );
      clone.querySelector('.movie-img').alt = movie.title;

      clone.querySelector('.movie-img').addEventListener('click', () => {
        location.hash = `#movie=${movie.id}`;
      });

      // clone.querySelector('button').innerText = '🤍';
      clone.querySelector('button').classList.add('movie-btn');
      const btn = clone.querySelector('button');
      likedMoviesList()[movie.id] && btn.classList.toggle('movie-liked');
      btn.addEventListener('click', () => {
        btn.classList.toggle('movie-liked');
        likeMovie(movie);
        getLikedMovies();
      });

      if (lazyLoad) {
        lazyLoader.observe(clone.querySelector('.movie-img'));
      }
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
const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((element) => {
    if (element.isIntersecting) {
      const url = element.target.getAttribute('data-img');
      element.target.setAttribute('src', url);
    }
  });
});

// Llamados a la API
export async function getTrendingMoviesPreview() {
  const { status, data } = await api(`trending/all/day`);
  createMovies(
    templateTrendingPreview,
    trendingMoviesPreviewList,
    data.results,
    { lazyLoad: true, clean: true }
  );
  if (status !== 200)
    throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
}
// categories
export async function getCategoriesPreview(id) {
  const { status, data } = await api('discover/movie', {
    params: {
      with_genres: id,
    },
  });
  if (status !== 200)
    throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
  const dataCategories = data.results;
  maxPage = data.total_pages;
  createMovies(templateGenericList, genericSection, dataCategories, {
    lazyLoad: true,
    clean: true,
  });
}

export function getPaginatedMoviesByCategorie(id) {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;

    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api('discover/movie', {
        params: {
          page,
          with_genres: id,
        },
      });
      const movies = data.results;
      createMovies(templateGenericList, genericSection, movies, {
        lazyLoad: true,
        clean: false,
      });
    }
  };
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

// search

export async function getMoviesBySearch(nameMovie) {
  const { data } = await api(`search/movie`, {
    params: {
      query: nameMovie,
    },
  });

  const categories = data.results;
  maxPage = data.total_pages;
  createMovies(templateGenericList, genericSection, categories);
}

export function getPaginatedMoviesBySearch(query) {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;

    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api('search/movie', {
        params: {
          page,
          query,
        },
      });
      const movies = data.results;
      createMovies(templateGenericList, genericSection, movies, {
        lazyLoad: true,
        clean: false,
      });
    }
  };
}

// trends
export async function getTrendingMovies(page = 1) {
  const { data } = await api(`trending/movie/day`, {
    params: {
      page,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(templateGenericList, genericSection, movies, {
    lazyLoad: true,
    clean: true,
  });
}

export async function getPaginatedTrendingMovies(params) {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;

  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api('trending/movie/day', {
      params: {
        page,
      },
    });
    const movies = data.results;
    createMovies(templateGenericList, genericSection, movies, {
      lazyLoad: true,
      clean: false,
    });
  }
}

// moviebyid

export async function getMovieById(id) {
  const { status, data } = await api(`movie/${id}`);
  if (status !== 200)
    throw new Error(`Error en la petición GET. Código HTTP: ${status}`);
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
export async function getCastMovies(id) {
  const { data } = await api(`movie/${id}/credits`);
  castMoviesContainer.innerHTML = '';

  const fragment = document.createDocumentFragment();
  data.cast.forEach((movie) => {
    const clone = templateMoviesCast.cloneNode(true);

    if (movie.profile_path !== null) {
      clone
        .querySelector('.movie-img')
        .setAttribute(
          'src',
          `https://image.tmdb.org/t/p/w300/${movie.profile_path}`
        );
    }

    fragment.appendChild(clone);
  });

  castMoviesContainer.appendChild(fragment);
}

// localStorage
export function getLikedMovies(params) {
  const likedMovies = likedMoviesList();
  const moviesArrray = Object.values(likedMovies);
  createMovies(templateFavoriteMovies, likedMovieList, moviesArrray, {
    lazyLoad: true,
    clean: true,
  });
}
