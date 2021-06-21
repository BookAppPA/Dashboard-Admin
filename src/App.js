import React, { useContext, useEffect } from 'react';
import PrivateSideBar from './routes/Private/PrivateSideBar';
import PublicRoutes from './routes/Public/PublicRoutes';
import { AuthContext } from "./context/Auth";
import { useDispatch } from 'react-redux';
import { getAllUsers } from './redux/actions';
import { apiURL } from './utils/constants';


function App() {
    const { currentUser, token } = useContext(AuthContext);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers(apiURL+'api/bdd/getAllUsers', token));
      }, [token])

    return currentUser ? <PrivateSideBar /> : <PublicRoutes />;
}

export default (App);
