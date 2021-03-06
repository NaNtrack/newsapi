import {createActions, createReducer} from 'reduxsauce';
import {set, cloneDeep} from 'lodash';
import {NewsService} from '@Services';
import AppActions from './App';
import apiErrorHandler from './utils'

export const INITIAL_STATE = {
  news: [],
  selectedArticle: null,
  favorites: [],
  sources: [],
  totalResults: 0,
  params: {},
  language: '',
};

/* ------------- Types and Action Creators ------------- */
export const {Types, Creators} = createActions({
  setNews: ['news', 'totalResults', 'params'],
  addFavorite: ['article'],
  setSources: ['sources'],
  setSelected: ['index'],
  setFavoriteSelected: ['index'],
  toggleFavorite: null,
  setLanguage: ['language'],
  toggleSelectedSource: ['sourceId'],
});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_NEWS]: (state, action) => {
    const {news, totalResults, params} = action;
    return {
      ...state,
      news,
      totalResults,
      params
    };
  },
  [Types.SET_SELECTED]: (state, action) => {
    return {
      ...state,
      selectedArticle: state.news[action.index],
    };
  },
  [Types.SET_FAVORITE_SELECTED]: (state, action) => {
    return {
      ...state,
      selectedArticle: state.favorites[action.index],
    };
  },
  [Types.ADD_FAVORITE]: (state, action) => {
    const newFavorites = state.favorites;
    newFavorites.push(action.article);
    return {
      ...state,
      favorites: newFavorites,
    };
  },
  [Types.SET_SOURCES]: (state, action) => {
    return {
      ...state,
      sources: action.sources,
    };
  },
  [Types.TOGGLE_FAVORITE]: (state) => {
    const {selectedArticle, favorites} = state
    const newSelected = cloneDeep(selectedArticle);
    let newFavorites = cloneDeep(favorites);
    if (selectedArticle.starred) {
      newSelected.starred = false;
      newFavorites = newFavorites.filter(el => {
        return el.title !== newSelected.title
          && el.author !== newSelected.author
          && el.publishedAt !== newSelected.publishedAt
          && el.source.name !== newSelected.source.name
      })
    } else {
      newSelected.starred = true;
      newFavorites.unshift(newSelected)
    }
    return {
      ...state,
      selectedArticle: newSelected,
      favorites: newFavorites,
    };
  },
  [Types.SET_LANGUAGE]: (state, action) => {
    return {
      ...state,
      language: action.language,
    };
  },
  [Types.TOGGLE_SELECTED_SOURCE]: (state, action) => {
    const {sources} = state;
    const {sourceId} = action;
    let newSources = cloneDeep(sources);
    newSources = newSources.map(el => {
      if (el.id === sourceId) {
        if (el.selected === true) {
          el.selected = false;
        } else {
          el.selected = true;
        }
      }

      return el;
    });
    return {
      ...state,
      sources: newSources,
    };
  },
});

/* ------------- Thunks actions ------------- */
const everythingRequest = (params) => {
  return dispatch => {
    dispatch(AppActions.setLoading(true));
    NewsService.everything(params)
      .then(response => {
        const {articles, totalResults} = response.data;
        dispatch(Creators.setNews(articles, totalResults, params));
        dispatch(AppActions.setLoading(false));
      })
      .catch(err => apiErrorHandler({dispatch, api: true}, err));
  };
}

const sourcesRequest = (params) => {
  return dispatch => {
    NewsService.sources(params)
      .then(response => {
        const {sources, totalResults} = response.data;
        dispatch(Creators.setSources(sources, totalResults, params));
      })
      .catch(err => apiErrorHandler({dispatch, api: true}, err));
  };
}

const selectArticleRequest = (index) => {
  return dispatch => {
    // TODO: verify index range
    dispatch(Creators.setSelected(index));
  };
}

const selectFavoriteArticleRequest = (index) => {
  return dispatch => {
    // TODO: verify index range
    dispatch(Creators.setFavoriteSelected(index));
  };
}


const toggleFavoriteRequest = () => {
  return dispatch => {
    dispatch(Creators.toggleFavorite());
  };
}

const setLanguageRequest = (language: string) => {
  return dispatch => {
    dispatch(Creators.setLanguage(language));
  };
}

const toggleSelectedSourceRequest = (sourceId: string) => {
  return dispatch => {
    dispatch(Creators.toggleSelectedSource(sourceId));
  };
}

export default {
  everythingRequest,
  sourcesRequest,
  selectArticleRequest,
  selectFavoriteArticleRequest,
  toggleFavoriteRequest,
  setLanguageRequest,
  toggleSelectedSourceRequest,
};
