import React, { useContext } from 'react';
import PrivateSideBar from './routes/Private/PrivateSideBar';
import PublicRoutes from './routes/Public/PublicRoutes';
import firebase from './services/firebase';
import { AuthContext } from "./context/Auth";

function Routes() {
    const { currentUser } = useContext(AuthContext);

    console.log('Firebase Auth', firebase);
    return currentUser ? <PrivateSideBar /> : <PublicRoutes />;
}

export default (Routes);
