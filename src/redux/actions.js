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
      .then(async res => {
        await dispatch({ type: 'GET_USER_LIST_BOOKS', payload: res.data });
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
      .then(async res => {
        console.log('TEST', res.data);
        await dispatch({ type: 'GET_COMMENTS_BY_USER', payload: res.data });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
}

export function getCommentsByBookId(url, token) {
  return function (dispatch) {
    return axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(async res => {
        var array1 = [];
        array1.push(res.data)

        await dispatch({ type: 'GET_COMMENTS_BY_BOOK_ID', payload: array1 });
        dispatch(setisFetching(false));
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
      .then(async res => {
        await dispatch({ type: 'GET_ALL_BOOKSELLERS', payload: res.data });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
}

export function getSellerList(url, token) {
  return function (dispatch) {
    return axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        dispatch({ type: 'GET_SELLER_LIST', payload: res.data });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
}