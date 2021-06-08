import React, { useContext } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { SidebarContext } from '../../hooks/useSidebar';
import ROUTE from '../../routes/RoutesNames';
import DropdownComponent from '../dropdown/DropdownComponent';
import adminLogo from'../../assets/png/admin.png';
import firebaseConfig from "../../services/firebase";

const useStyles = createUseStyles((theme) => ({
    avatar: {
        height: 40,
        width: 40,
        minWidth: 35,
        borderRadius: 50,
        marginLeft: 14,
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        '@media (max-width: 768px)': {
            marginLeft: 14
        }
    },
    container: {
        height: 40
    },
    name: {
        ...theme.typography.itemTitle,
        textAlign: 'right',
        '@media (max-width: 768px)': {
            display: 'none'
        },
        color: theme.color.veryDarkGrayishBlue
    },
    separator: {
        borderLeft: `1px solid ${theme.color.veryDarkGrayishBlue}`,
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 6,
        '@media (max-width: 768px)': {
            marginLeft: 14,
            marginRight: 0
        }
    },
    title: {
        ...theme.typography.title,
        '@media (max-width: 1080px)': {
            marginLeft: 50
        },
        '@media (max-width: 468px)': {
            fontSize: 20
        },
        color: theme.color.veryDarkGrayishBlue
    },
    iconStyles: {
        cursor: 'pointer',
        marginLeft: 25,
        '@media (max-width: 768px)': {
            marginLeft: 12
        }
    }
}));

function HeaderComponent() {
    const { push } = useHistory();
    const { currentItem } = useContext(SidebarContext);
    const theme = useTheme();
    const classes = useStyles({ theme });

    let title;
    switch (true) {
        case currentItem === ROUTE.DASHBOARD_OVERVIEW:
            title = 'Accueil';
            break;
        case currentItem === ROUTE.USERS:
            title = 'Utilisateurs';
            break;
        case currentItem === ROUTE.CATEGORIES:
            title = 'Catégories';
            break;
        case currentItem === ROUTE.BOOKS:
            title = 'Livres';
            break;
        case currentItem === ROUTE.settings:
            title = 'Paramètres';
            break;
        default:
            title = '';
    }

    function onSettingsClick() {
        push(ROUTE.SETTINGS);
    }

    function logout() {
        console.log("Route")
        firebaseConfig
        .auth()
        .signOut()
        .then(res => {
           push(ROUTE.LOGIN);
         })
        push(ROUTE.LOGIN)
    }

    return (
        <Row className={classes.container} vertical='center' horizontal='space-between'>
            <span className={classes.title}>{title}</span>
            <Row vertical='center'>
                <div className={classes.separator}></div>
                <DropdownComponent
                    label={
                        <>
                            <span className={classes.name}>Admin</span>
                            <img
                                src={adminLogo}
                                alt='avatar'
                                className={classes.avatar}
                            />
                        </>
                    }
                    options={[
                        {
                            label: 'Paramètres',
                            onClick: onSettingsClick
                        },
                        {
                            label: 'Se déconnecter',
                            onClick: logout
                        }
                    ]}
                    position={{
                        top: 52,
                        right: -6
                    }}
                />
            </Row>
        </Row>
    );
}

HeaderComponent.propTypes = {
    title: string
};

export default HeaderComponent;
