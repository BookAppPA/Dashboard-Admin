import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ROUTE from '../RoutesNames';
import LoadingComponent from '../../components/loading/LoadingComponent';

const DashboardOverview = lazy(() => import('../../pages/dashboard/Dashboard'));
const Users = lazy(() => import('../../pages/users/Users'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={ROUTE.DASHBOARD_OVERVIEW} component={DashboardOverview} />
                <Route exact path={ROUTE.USERS} component={Users} />
                <Route exact path={ROUTE.AUTHORS} render={() => <div>AUTHORS</div>} />
                <Route exact path={ROUTE.BOOKS} render={() => <div>BOOKS</div>} />
                <Redirect to={ROUTE.BOOKS} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
