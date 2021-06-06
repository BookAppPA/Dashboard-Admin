import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { Column, Row } from 'simple-flexbox';
import { SidebarComponent, SidebarContext } from '../../components/sidebar';
import HeaderComponent from '../../components/header/HeaderComponent';
import PrivateRoutes from './PrivateRoutes';

const useStyles = createUseStyles((theme) => ({
    container: {
        height: '100%',
        minHeight: 950,
        backgroundColor: theme.color.light
    },
    mainBlock: {
        marginLeft: 255,
        padding: 30,
        '@media (max-width: 1080px)': {
            marginLeft: 0
        },
    },
    contentBlock: {
        marginTop: 54
    }
}));

function PrivateSideBar() {
    const theme = useTheme();
    const classes = useStyles({ theme });

    return (
        <SidebarContext>
            <Row className={classes.container}>
                <SidebarComponent />
                <Column flexGrow={1} className={classes.mainBlock}>
                    <HeaderComponent />
                    <div className={classes.contentBlock}>
                        <PrivateRoutes />
                    </div>
                </Column>
            </Row>
        </SidebarContext>
    );
}

export default PrivateSideBar;
