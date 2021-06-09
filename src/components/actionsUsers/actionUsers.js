import React from 'react';
import { Row } from 'simple-flexbox';
import { IconButton, createMuiTheme} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Block from '@material-ui/icons/Block';
import Check from '@material-ui/icons/Check';
import Edit from '@material-ui/icons/Edit';

const theme = createMuiTheme({
    palette: {
        primary: {
            main:'#2e7d32',
        },
        secondary: {
            main: '#d50000'
        },
    }
});

const ActionsUsers = ({
    user = false,
    onClickCheckUser,
    onClickBlockUser,
    onClickEdit, 
}) => {
    return (
        <ThemeProvider theme={theme}>
            <Row flexGrow={1} horizontal='center' vertical='center'>
                <IconButton 
                    aria-label="accept" 
                    color="primary"
                    onClick={user ? onClickCheckUser : onClickEdit}
                >
                    { user ? 
                        <Check />
                    :
                        <Edit />
                    }
                </IconButton>
                <IconButton 
                    aria-label="block" 
                    color="secondary"
                    onClick={onClickBlockUser}
                >
                    <Block />
                </IconButton>
            </Row>
        </ThemeProvider>
    );
}

export default ActionsUsers;