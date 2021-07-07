import React, { useContext, useEffect } from 'react';
import PrivateSideBar from './routes/Private/PrivateSideBar';
import PublicRoutes from './routes/Public/PublicRoutes';
import { AuthContext } from "./context/Auth";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getAllBookSellers, getUserListBooks } from './redux/actions';
import { apiURL } from './utils/constants';

function App() {
  const { currentUser, token } = useContext(AuthContext);
  const dispatch = useDispatch();
  const allusersId = useSelector(state => state.allUsers)
  const listBooks = useSelector(state => state.userListBooks)

  const getData = async () => {
    dispatch(getAllUsers(apiURL + 'user/getAllUsers', token));
    dispatch(getAllBookSellers(apiURL + 'bookseller/getInitListBookSeller', token))
  }

  useEffect(() => {
    getData();
    return () => {
      getData();
    }
  }, [token])


  return currentUser ? <PrivateSideBar /> : <PublicRoutes />;
}

export default (App);
