import React from 'react';
import {
    Divider,
    Avatar,
    Grid,
    Paper,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const CommentsSection = ({
    comments,
}) => {
    return (
        <div className="App">
            <h2>{comments.length} Avis</h2>
            <Paper style={{ padding: "40px 20px" }}>
                {comments.map((comment, index) => (
                    <div>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt="Remy Sharp" src={comment.user_pic} />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>{comment.book_title} - {comment.title}</h4>
                                <p style={{ textAlign: "left" }}>
                                    {comment.message}
                                </p>
                                <p style={{ textAlign: "left", color: "gray" }}>
                                    {comment.timestamp}
                                </p>
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
