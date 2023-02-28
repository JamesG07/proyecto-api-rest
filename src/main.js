import { navigation } from './navigation.js';
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  Headers: {
    'Content-Type': 'application/json;charset=utg-8',
  },

  params: {
    api_key: '959830e1df110edd3b1f72425a9e6a14',
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
  const { data } = await api(`trending/movie/day`);
  createMovies(
    templateTrendingPreview,
    trendingMoviesPreviewList,
    data.results
  );
}
export async function getCategoriesPreview(id) {
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
    },
  });
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
  const { data } = await api(`/search/movie`, {
    params: {
      query: `${nameMovie}`,
    },
  });
  const categories = data.results;

  createMovies(templateGenericList, genericSection, categories);
}

export async function getTrendingMovies(params) {
  const { data } = await api(`trending/all/day`);
  const movies = data.results;

  createMovies(templateGenericList, genericSection, movies);
}
