import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowSize from './hooks/useWindowSize';
import PrivateSideBar from './routes/Private/PrivateSideBar';
import PublicRoutes from './routes/Public/PublicRoutes';
import firebase from './services/firebase';
import { AuthContext } from "./context/Auth";

function Routes() {
    // eslint-disable-next-line no-unused-vars
    const [width, height] = useWindowSize();
    const { currentUser } = useContext(AuthContext);

    console.log('Firebase Auth', firebase);
    return currentUser ? <PrivateSideBar /> : <PublicRoutes />;
}

export default (Routes);
