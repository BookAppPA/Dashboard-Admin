import axios from 'axios';
import apiURL, { baseUrlGoogleBooksAPI } from '../utils/constants';

export function setisFetching(trueOrFalse) {
  return function (dispatch) {
    return dispatch({ type: 'SET_IS_FETCHING', payload: trueOrFalse})
  }
}

export function getAllUsers(url, token) {
  return function (dispatch) {
    return axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        dispatch({ type: 'GET_ALL_USERS', payload: res.data });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
}

export function getUserById(url, token) {
  return function (dispatch) {
    return axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        dispatch({ type: 'GET_USER_BY_ID', payload: res.data.data });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
}

export function getUserListBooks(url, token) {
  return function (dispatch) {
    return axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        dispatch({ type: 'GET_USER_LIST_BOOKS', payload: res.data });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
}

export function getCommentsByUser(url, token, uid, userListBooks) {
  return function (dispatch) {
    return axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'uid': uid,
        'listbooks': userListBooks, 
      },
    })
      .then(res => {
        console.log('TEST', res.data);
        dispatch({ type: 'GET_COMMENTS_BY_USER', payload: res.data });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
}


export function getAllBookSellers(url, token) {
  return function (dispatch) {
    return axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        dispatch({ type: 'GET_ALL_BOOKSELLERS', payload: res.data });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
}