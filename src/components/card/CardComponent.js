import React from 'react';
import { Column } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
    container: {
        backgroundColor: theme.color.veryDarkGrayishBlue,
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        cursor: 'pointer',
        maxWidth: 350,
        padding: '16px 32px 16px 32px',
        '&:hover': {
            borderColor: theme.color.lightBlue,
            '&:nth-child(n) > span': {
                color: theme.color.lightBlue
            }
        },
        borderRadius: 30,
    },
    title: {
        ...theme.typography.cardTitle,
        color: theme.color.light,
        marginBottom: 12,
        minWidth: 102,
        textAlign: 'center'
    },
    value: {
        color: theme.color.light,
        fontWeight: 'bold',
        fontSize: 40,
        letterSpacing: '1px',
        lineHeight: '50px',
        textAlign: 'center'
    }
}));

function CardComponent({ className = '', title, value, onClick }) {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const composedClassName = [classes.container, className].join(' ');
    return (
        <Column onClick={onClick} flexGrow={1} className={composedClassName} horizontal='center' vertical='center'>
            <span className={classes.title}>{title}</span>
            <span className={classes.value}>{value}</span>
        </Column>
    );
}

export default CardComponent;
