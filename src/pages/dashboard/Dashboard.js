import React, { useEffect, useContext } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import CardComponent from '../../components/card/CardComponent';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, getUserById } from '../../redux/actions';
import { AuthContext } from '../../context/Auth';
import { apiURL } from '../../utils/constants';
import { useHistory } from 'react-router-dom';
import ROUTES from '../../routes/RoutesNames';

const useStyles = createUseStyles({
    cardsContainer: {
        marginRight: -30,
        marginTop: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 30
    },
    lastRow: {
        marginTop: 30
    },
    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {
            marginTop: 30
        }
    }
});

function DashboardOverview() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { token } = useContext(AuthContext);
    console.log('token', token);
    const { push } = useHistory();

    const allUsers = useSelector((state) => state.allUsers);
    const allBookSellers = useSelector((state) => state.allBookSellers)


    function goToUsers() {
        push(ROUTES.USERS);
    };

    function goToBookSellers() {
        push(ROUTES.BOOKSTORES);
    };

    function goToRatings() {
        push(ROUTES.COMMENTS);
    };

    return (
        <Column>
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-between'
            >
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                >
                    <CardComponent
                        className={classes.miniCardContainer}
                        title='Utilisateurs'
                        value={allUsers.length}
                        onClick={goToUsers}
                    />
                    <CardComponent
                        className={classes.miniCardContainer}
                        title='Librairies'
                        value={allBookSellers.length}
                        onClick={goToBookSellers}

                    />
                    <CardComponent
                        className={classes.miniCardContainer}
                        title='Livres'
                        value='43'
                        onClick={goToRatings}
                    />
                </Row>
            </Row>
        </Column>
    );
}

export default DashboardOverview;
