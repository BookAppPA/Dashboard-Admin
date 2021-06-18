import axios from 'axios';
import apiURL, { baseUrlGoogleBooksAPI } from '../utils/constants';

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
        dispatch({ type: 'GET_USER_BY_ID', payload: res.data });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
}