import axios from 'axios';
import apiURL, { baseUrlGoogleBooksAPI } from '../utils/constants';

export function setisFetching(trueOrFalse) {
  return function (dispatch) {
    return dispatch({ type: 'SET_IS_FETCHING', payload: trueOrFalse})
  }
}

export function resetState() {
  return {
    type: "RESET_COMMENTS_LIST"
  }
}

export function getAllUsers(url, token) {
  return async function (dispatch) {
    try {
      const res = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      await dispatch({ type: 'GET_ALL_USERS', payload: res.data });
    } catch (error) {
      console.log('GETALLUSER', error.message);
    }
  };
}

export function getUserById(url, token) {
  return async function (dispatch) {
    try {
      const res = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      await dispatch({ type: 'GET_USER_BY_ID', payload: res.data.data });
    } catch (error) {
      console.log('GETUSERID', error.message);
    }
  };
}

export function getUserListBooks(url, token) {
  return async function (dispatch) {
    try {
      const res = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      await dispatch({ type: 'GET_USER_LIST_BOOKS', payload: res.data });
    } catch (error) {
      console.log('GETUSERLISTBOOKS', error.message);
    }
  };
}

export function getCommentsByUser(url, token, uid, userListBooks) {
  return async function (dispatch) {
    try {
      const res = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'uid': uid,
          'listbooks': userListBooks,
        },
      });
      await dispatch({ type: 'GET_COMMENTS_BY_USER', payload: res.data });
    } catch (error) {
      console.log('GETCOMMENT', error.message);
    }
  };
}

export function getCommentsByBookId(url, token) {
  return async function (dispatch) {
    try {
      const res = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      await dispatch({ type: 'GET_COMMENTS_BY_BOOK_ID', payload: res.data });
      dispatch(setisFetching(false));
    } catch (error) {
      console.log('GETCOMMENTBYID', error);
    }
  };
}

export function getOneBookComment(url) {
  return async function (dispatch) {
    try {
      const res = await axios.get(url);
      await dispatch({ type: 'GET_ONE_BOOK_COMMENTS', payload: res.data });
    } catch (error) {
      console.log('GETONEBOOKIDCOMMENT', error);
    }
  };
}


export function getAllBookSellers(url, token) {
  return async function (dispatch) {
    try {
      const res = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      await dispatch({ type: 'GET_ALL_BOOKSELLERS', payload: res.data });
    } catch (error) {
      console.log('GETALLBOOKSELLER', error.message);
    }
  };
}

export function getSellerList(url, token) {
  return async function (dispatch) {
    try {
      const res = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      await dispatch({ type: 'GET_SELLER_LIST', payload: res.data });
    } catch (error) {
      console.log('GETSELLERLIST', error.message);
    }
  };
}

export function getAllBooksInApp(url) {
  return async function (dispatch) {
    try {
      const res = await axios.get(url);
      dispatch({ type: 'GET_ALL_BOOKS_IN_APP', payload: res.data });
    } catch (error) {
      console.log('GETALLBOOKSINAPP', error);
    }
  };
}

export function deleteCommentById(url, uid, token) {
  return async function (dispatch) {
    try {
      await axios({
        method: 'post',
        url: url,
        data:{
          uid: uid,
        },
        headers: {'Authorization': `Bearer ${token}`},
      }).then((res)=>{
        dispatch({type: 'DELETE_COMMENTS_BY_ID', payload: res.data})
      });
    } catch(err) {
      console.log(err);
    }
  };
}