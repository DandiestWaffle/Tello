import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import update from 'immutability-helper';

import {
  EPISODES_RECEIVE,
  START_TRACKING_NEW_SHOWS,
  REMOVE_SHOW,
  TOGGLE_EPISODE,
  MARK_EPISODE_AS_SEEN,
  MARK_EPISODE_AS_UNSEEN,
  USER_DATA_RECEIVE,
  USER_DATA_REQUEST,
  USER_DATA_FAILURE,
} from '../actions';


const initialState = {
  token: null,
  isFetching: false,
  user: {},
};


function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case USER_DATA_RECEIVE: {
      return {
        id: action.id,
        name: action.name,
        email: action.email,
      };
    }

    default: {
      return state;
    }
  }
}

function isFetchingReducer(state = initialState.isFetching, action) {
  switch (action.type) {
    case USER_DATA_REQUEST:
      return true;

    case USER_DATA_FAILURE:
    case USER_DATA_RECEIVE:
      return false;

    default:
      return state;
  }
}

function tokenReducer(state = initialState.token, action) {
  // At the moment, our token doesn't change throughout the session.
  // It's loaded on instantiation, if available.
  // We just store it in a reducer for convenience (and to derive things).
  return state;
}

export default combineReducers({
  token: tokenReducer,
  isFetching: isFetchingReducer,
  user: userReducer,
});


// Selectors
export const getToken = state => state.auth.token;
export const getIsFetching = state => state.auth.isFetching;
export const getUser = state => state.auth.user;

// This doesn't _really_ tell us if we're logged in;
// It tells us if we're attempting a login, though, so it's safe to
// use for things like redirecting from login-only areas.
export const getIsLoggedIn = state => !!getToken(state);
