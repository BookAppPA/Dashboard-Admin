import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ROUTE from '../RoutesNames';
import LoadingComponent from '../../components/loading/LoadingComponent';

const DashboardOverview = lazy(() => import('../../pages/dashboard/Dashboard'));
const Users = lazy(() => import('../../pages/user/usersList/'));
const UserDetails = lazy(() => import('../../pages/user/userDetails/'));
const Bookstores = lazy(() => import('../../pages/bookseller/bookStores/'));
const BookSellerDetail = lazy(() => import('../../pages/bookseller/bookSellerDetail'));
const Comments = lazy(() => import('../../pages/comments/Comments'));
const Settings = lazy(() => import('../../pages/settings/Settings'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={ROUTE.DASHBOARD_OVERVIEW} component={DashboardOverview} />
                <Route exact path={ROUTE.USERS} component={Users} />
                <Route exact path={ROUTE.USERS_DETAILS} component={UserDetails} />
                <Route exact path={ROUTE.BOOKSTORES} component={Bookstores} />
                <Route exact path={ROUTE.BOOKSELLER_DETAIL} component={BookSellerDetail} />
                <Route exact path={ROUTE.COMMENTS} component={Comments} />
                <Route exact path={ROUTE.SETTINGS} component={Settings} />
                <Redirect to={ROUTE.DASHBOARD_OVERVIEW}/>
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
