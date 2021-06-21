import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import {
    Card,
    CardMedia,
    CardContent,
    Typography
} from '@material-ui/core';

const useStyles = createUseStyles((theme) => ({
    bookContainer: {
        width: window.innerWidth * 0.10,
        height: window.innerWidth * 0.2,
        marginLeft: window.innerWidth * 0.01,
    },
    bookCover: {
        width: window.innerWidth * 0.10,
        height: window.innerWidth * 0.15
    }
}));

function InfosDetails({ img, title }) {
    const theme = useTheme();
    const classes = useStyles({ theme });

    return (
        <div>
            <Card className={classes.bookContainer}>
                <CardMedia className={classes.bookCover} image={img} />
                <CardContent>
                    <Typography variant="h8" color="textSecondary" component="p">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default InfosDetails;