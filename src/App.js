import React, { useContext } from 'react';
import PrivateSideBar from './routes/Private/PrivateSideBar';
import PublicRoutes from './routes/Public/PublicRoutes';
import { AuthContext } from "./context/Auth";

function App() {
    const { currentUser } = useContext(AuthContext);
    return currentUser ? <PrivateSideBar /> : <PublicRoutes />;
}

export default (App);
