import React from 'react';
import {
    Divider,
    Avatar,
    Grid,
    Paper,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        maxWidth: window.innerWidth * 0.6,
    },
});

const CommentsSection = ({
    comments,
}) => {
    const classes = useStyles();

    return (
        <div>
             <h2>{`Ses derniers avis (${comments.length})`}</h2>
            <Paper style={{ padding: "40px 20px" }}>
                {comments.map((comment) => (
                    <div>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar style={{width: 100, height:100}} alt="Remy Sharp" src={comment.user_pic} />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>{comment.book_title}</h4>
                                <h5 style={{ margin: 10, textAlign: "left" }}>{comment.title}</h5>
                                <p style={{ textAlign: "left", margin: 20 }}>
                                    {comment.message}
                                </p>
                                {/* <p style={{ textAlign: "left", color: "gray" }}>
                                    {comment.timestamp}
                                </p> */}
                            </Grid>
                            <img
                                src={comment.book_pic}
                                style={{ alignItems: 'flex-end', display: 'flex', marginRight: 20 }}
                            />
                        </Grid>
                        <Rating name="read-only" value={comment.note} readOnly />
                        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                    </div>
                ))}
            </Paper>
        </div>
    );
}

export default CommentsSection;
