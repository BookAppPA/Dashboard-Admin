import React from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import AppLogo from '../../assets/png/BookApp_logo.png';


const useStyles = createUseStyles((theme) => ({
    container: {
        marginLeft: 32,
        marginRight: 32
    },
    title: {
        ...theme.typography.cardTitle,
        color: theme.color.grayishBlue,
        opacity: 0.7,
        marginLeft: 12
    },
    logo: {
        width: 40,
        height: 40,
    }
}));

function LogoComponent() {
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <Row className={classes.container} horizontal='center' vertical='center'>
            <img src={AppLogo} className={classes.logo} alt='Logo' />
            <span className={classes.title}>BookWorn</span>
        </Row>
    );
}

export default LogoComponent;
