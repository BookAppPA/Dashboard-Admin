import React, { useEffect, useContext, useState} from 'react';
import {
    Divider,
    Avatar,
    Grid,
    Paper,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { createUseStyles } from 'react-jss';
import { Row } from 'simple-flexbox';
import ActionsUsers from '../../components/actionsUsers/actionUsers';
import { deleteCommentById, getUserById } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/Auth';
import { apiURL } from '../../utils/constants';
import ROUTES from '../../routes/RoutesNames';
import { useLocation, useHistory } from 'react-router-dom';

const useStyles = createUseStyles({
    container: {
        maxWidth: window.innerWidth * 0.6,
    },
});

const CommentsSection = ({
    comments,
    listComments = false,
    nbRatings,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { token } = useContext(AuthContext)
    const { replace } = useHistory();
    const [refresh, setRefresh] = useState(false);

    function deleteRating(bookID, userID, token){
        dispatch(deleteCommentById(apiURL + `rating/deleteRating/${bookID}`, userID, token))
        setRefresh(!refresh);
    } 

    async function goToUserDetails(userID){
        dispatch(getUserById(apiURL + `user/getUserById/${userID}`, token));
        replace(ROUTES.USERS_DETAILS)
    }

    useEffect(()=> {
        if(comments == undefined){
            replace(ROUTES.DASHBOARD_OVERVIEW);
            alert("Oups, veuillez réessayer d'ici peu");
        }
    }, [refresh])

    return (
        <div>
            {!listComments && 
            <h2>Ses derniers avis</h2>
            }
                {comments != undefined &&
                    <Paper style={{ padding: "40px 20px" }}>
                        {comments.map((comment) => (
                            <div>
                                <Row>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <div onClick={() => goToUserDetails(comment.user_id)}>
                                            <Avatar style={{width: 100, height:100}} alt="Remy Sharp" src={comment.user_pic} />
                                        </div>
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
                                <ActionsUsers comments={true} onClickDelete={() => deleteRating(comment.book_id, comment.user_id, token)} />
                                </Row>
                                <Rating name="read-only" value={comment.note} readOnly />
                                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                            </div>
                        ))}
                    </Paper>
                }
        </div>
    );
}

export default CommentsSection;
