import React from 'react';
import { any, arrayOf, func, string } from 'prop-types';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { useSidebar } from '../../hooks/useSidebar';

const useStyles = createUseStyles({
    activeContainer: {
        backgroundColor: ({ theme }) => theme.color.paleBlueTransparent
    },
    container: {
        display: 'flex',
        height: 56,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: ({ theme }) => theme.color.paleBlueTransparent
        },
        paddingLeft: ({ level }) => 32 * level,
        transition: 'all 0.2s ease-in-out'
    },
    leftBar: {
        borderLeft: ({ theme, level }) =>
            level > 1 ? 'none' : `3px solid ${theme.color.darkGrayishBlue}`
    },
    title: {
        fontSize: 16,
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: ({ theme, isActive }) => (isActive ? theme.color.paleBlue : theme.color.grayishBlue),
        marginLeft: 24
    }
});

function MenuItemComponent({ children, icon: Icon, id, items = [], level = 1, onClick, title }) {
    const theme = useTheme();
    const { isActive, onItemClick } = useSidebar({
        item: id,
        items
    });
    const classes = useStyles({ theme, level, isActive });
    const classNameColumn = isActive ? classes.leftBar : '';
    const classNameContainer = [classes.container, isActive && classes.activeContainer].join(' ');
    const iconColor = isActive ? theme.color.light : theme.color.grayishBlue2;

    function onItemClicked(e) {
        if (onClick) {
            onClick(e);
        }
        onItemClick();
    }

    return (
        <Column key={id} className={classNameColumn}>
            <Row vertical='center' onClick={onItemClicked} className={classNameContainer}>
                <Icon fill={iconColor} />
                <span className={classes.title}>{title}</span>
            </Row>
        </Column>
    );
}

MenuItemComponent.defaultProps = {};

MenuItemComponent.propTypes = {
    children: any,
    icon: func,
    id: string,
    onClick: func,
    items: arrayOf(string),
    title: string
};

export default MenuItemComponent;
