import React, { useContext } from 'react';
import PrivateSideBar from './routes/Private/PrivateSideBar';
import PublicRoutes from './routes/Public/PublicRoutes';
import firebase from './services/firebaseConfig';
import { AuthContext } from "./context/Auth";

function App() {
    console.log('firebase app', firebase);
    const { currentUser } = useContext(AuthContext);

    return currentUser ? <PrivateSideBar /> : <PublicRoutes />;
}

export default (App);
