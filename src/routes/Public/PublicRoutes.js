import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ROUTE from '../RoutesNames';
import LoadingComponent from '../../components/loading/LoadingComponent';

const SignIn = lazy(() => import('../../pages/auth/SignIn/index'));
const ForgotPassword = lazy(() => import('../../pages/auth/ForgotPassword/index'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={ROUTE.LOGIN} component={SignIn} />
                <Route exact path={ROUTE.FORGOT_PASSWORD} component={ForgotPassword} />
                <Redirect to={ROUTE.LOGIN} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
