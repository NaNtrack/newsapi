import {createActions, createReducer} from 'reduxsauce';
import {NewsService} from '@Services';
import AppActions from './App';
import apiErrorHandler from './utils'

export const INITIAL_STATE = {
  news: [],
  selectedArticle: null,
  favorites: [],
  sources: [],
  totalResults: 0,
  newsType: 'everything',
  params: {}
};

/* ------------- Types and Action Creators ------------- */
export const {Types, Creators} = createActions({
  setNews: ['news', 'totalResults', 'newsType', 'params'],
  addFavorite: ['article'],
  setSources: ['sources'],
  setSelected: ['index'],
  setFavoriteSelected: ['index'],
  toggleFavorite: null,
});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_NEWS]: (state, action) => {
    const {news, totalResults, newsType, params} = action;
    return {
      ...state,
      news,
      totalResults,
      newsType,
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
      news: action.sources,
    };
  },
  [Types.TOGGLE_FAVORITE]: (state) => {
    const {selectedArticle, favorites} = state
    const newSelected = selectedArticle;
    let newFavorites = favorites;
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
});

/* ------------- Thunks actions ------------- */
const headlinesRequest = (params) => {
  return dispatch => {
    dispatch(AppActions.setLoading(true));
    NewsService.headlines(params)
      .then(response => {
        const {articles, totalResults} = response.data;
        dispatch(Creators.setNews(articles, totalResults, 'headlines', params));
        dispatch(AppActions.setLoading(false));
      })
      .catch(err => apiErrorHandler({dispatch, api: true}, err));
  };
}

const everythingRequest = (params) => {
  return dispatch => {
    dispatch(AppActions.setLoading(true));
    NewsService.everything(params)
      .then(response => {
        const {articles, totalResults} = response.data;
        dispatch(Creators.setNews(articles, totalResults, 'everything', params));
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

const refreshRequest = () => {
  return (dispatch, getState) => {
    const {news} = getState();
    const {newsType, params} = news;
    if (newsType === 'everything') {
      dispatch(everythingRequest(params));
    } else {
      dispatch(headlinesRequest(params));
    }
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
    // TODO: verify index range
    dispatch(Creators.toggleFavorite());
  };
}

export default {
  headlinesRequest,
  everythingRequest,
  sourcesRequest,
  refreshRequest,
  selectArticleRequest,
  selectFavoriteArticleRequest,
  toggleFavoriteRequest,
};
