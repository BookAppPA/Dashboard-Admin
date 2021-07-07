import { Box } from "@material-ui/core";
import * as React from "react";
import {
    useAnalyticsApi,
    useAuthorize,
    useDataChart,
    useSignOut,
    useViewSelector,
} from "react-use-analytics-api";
import { ActiveUsersChart, SessionsByDateChart, SessionsByUserTypeChart, GeoChart } from "react-analytics-charts";
import LoadingComponent from "../loading";
import { Row } from "simple-flexbox";
import theme from "../../utils/theme";

export default function Graph() {
    const { ready, gapi, authorized, error } = useAnalyticsApi();
    const [viewId, setViewId] = React.useState();
    const viewSelectorContainerId = "view-selector-container";
    useViewSelector(
        authorized ? gapi : undefined,
        viewSelectorContainerId,
        (viewId) => setViewId(viewId)
    );
    const authDiv = React.useRef(null);
    const [authorizeCalled, setAuthorizeCalled] = React.useState(false);
    const authorize = useAuthorize(gapi, {
        clientId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
        container: "authorize-container-id",
    });
    React.useEffect(() => {
        if (ready && !error && !authorizeCalled) {
            authorize();
            setAuthorizeCalled(true);
        }
    }, [ready, error, authorizeCalled, authorize]);

    return (
        <div>
            {!ready && <div>Chargement </div>}
            {ready && (
                <div>
                    {authorized != undefined || authorized ? (
                        <div>
                            <Row style={{ marginTop: "15px" }}>
                                <div style={{display: 'none'}} id={viewSelectorContainerId} />
                            </Row>
                            <div style={{ marginTop: "30px" }}>
                                <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap' }} className="data-chart" id="data-chart-container">
                                    <Box border={2} borderColor={theme.color.darkGrayishBlue} style={{ width: window.innerWidth * 0.4, margin: 3 }}>
                                        <ActiveUsersChart
                                            gapi={gapi}
                                            viewId={viewId}
                                            days={28}
                                            activeUserDays={7}
                                            options={{
                                                backgroundColor: theme.color.grayishBlue3,
                                                marginLeft: 10,
                                                colors: [theme.color.darkRed],
                                                title:"Utilisateur(s) actifs les 7 derniers jours",
                                            }}
                                        />
                                    </Box>
                                    <Box border={2} borderColor={theme.color.darkGrayishBlue} style={{ width: window.innerWidth * 0.4, margin: 3 }}>
                                        <SessionsByDateChart
                                            gapi={gapi}
                                            viewId={viewId}
                                            days={28}
                                            options={{
                                                backgroundColor: theme.color.grayishBlue3,
                                                marginLeft: 10,
                                                colors: [theme.color.darkRed],
                                                title:"Session(s) actives les 28 derniers jours",
                                            }}
                                        />
                                    </Box>
                                    <Box border={2} borderColor={theme.color.darkGrayishBlue} style={{ width: window.innerWidth * 0.4, margin: 3 }}>
                                        <SessionsByUserTypeChart
                                            gapi={gapi}
                                            viewId={viewId}
                                            days={28}
                                            options={{
                                                backgroundColor: theme.color.grayishBlue3,
                                                title:"Session(s) par OS",
                                            }}
                                        />
                                    </Box>
                                    <Box border={2} borderColor={theme.color.darkGrayishBlue} style={{ width: window.innerWidth * 0.27, margin: 3 }}>
                                        <GeoChart
                                            gapi={gapi}
                                            options={{
                                                region: "FR",
                                                resolution: "countries",
                                                backgroundColor: theme.color.grayishBlue3,
                                                title:"Session(s) en Europe",
                                                
                                            }}
                                            query={{
                                                metrics: "ga:sessions",
                                                dimensions: "ga:country",
                                                "start-date": `28daysAgo`,
                                                "end-date": "today",
                                                ids: viewId,
                                            }}
                                            container="traffic-geo-chart"
                                        />
                                    </Box>
                                </div>
                            </div>
                        </div>
                    ): null} 
                    {!authorized && (
                        <div>
                            <div ref={authDiv} id="authorize-container-id"></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}