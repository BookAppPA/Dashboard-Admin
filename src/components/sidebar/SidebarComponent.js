import React from 'react';
import { useHistory } from 'react-router-dom';
import ROUTE from '../../routes/RoutesNames';
import {
    IconAgents,
    IconContacts,
    IconLogout,
    IconOverview,
    IconSubscription} from '../../assets/iconsSVG';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/People';
import LogoComponent from './LogoComponent';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';
import { logout } from '../../services/firebase';


function SidebarComponent() {
    const { push } = useHistory();
    const isMobile = window.innerWidth <= 1080;

    async function disconnect() {
        logout(push, ROUTE.LOGIN);
    }

    function onClick(routes) {
        push(routes);
    }

    return (
        <Menu isMobile={isMobile}>
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                <LogoComponent />
            </div>
            <MenuItem
                id={ROUTE.DASHBOARD_OVERVIEW}
                title='Accueil'
                icon={HomeIcon}
                onClick={() => onClick(ROUTE.DASHBOARD_OVERVIEW)}
            />
            <MenuItem
                id={ROUTE.USERS}
                title='Utilisateurs'
                icon={UserIcon}
                onClick={() => onClick(ROUTE.USERS)}
            />
            <MenuItem
                id={ROUTE.BOOKSTORES}
                title='Libraires'
                icon={LocalLibraryIcon}
                onClick={() => onClick(ROUTE.BOOKSTORES)}
            />
            <MenuItem
                id={ROUTE.BOOKS}
                title='Livres'
                icon={IconContacts}
                onClick={() => onClick(ROUTE.BOOKS)}
            />
            <MenuItem id='logout' title='Se déconnecter' icon={IconLogout} onClick={disconnect} />
        </Menu>
    );
}

export default SidebarComponent;
