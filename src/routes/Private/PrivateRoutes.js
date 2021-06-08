import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ROUTE from '../RoutesNames';
import LoadingComponent from '../../components/loading/LoadingComponent';

const DashboardOverview = lazy(() => import('../../pages/dashboard/Dashboard'));
const Users = lazy(() => import('../../pages/users/Users'));
const Categories = lazy(() => import('../../pages/categories/Categories'));
const Books = lazy(() => import('../../pages/books/Books'));
const Settings = lazy(() => import('../../pages/settings/Settings'));
const EditBook = lazy(() => import('../../pages/books/edit_book'));
const EditCategory = lazy(() => import('../../pages/books/Books'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={ROUTE.DASHBOARD_OVERVIEW} component={DashboardOverview} />
                <Route exact path={ROUTE.USERS} component={Users} />
                <Route exact path={ROUTE.CATEGORIES} component={Categories} />
                <Route exact path={ROUTE.BOOKS} component={Books} />
                <Route exact path={ROUTE.SETTINGS} component={Settings} />
                <Route exact path={ROUTE.EDIT_BOOK} component={EditBook} />
                <Route exact path={ROUTE.EDIT_CATEGORY} component={EditCategory} />
                <Redirect to={ROUTE.DASHBOARD_OVERVIEW}/>
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
