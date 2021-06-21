import { useContext, useEffect, useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useLocation, useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import { Column, Row } from 'simple-flexbox';
import {
  CardContent,
  CardHeader,
  Chip,
  TextField,
  TextareaAutosize,
  Button,
  Box,
  Card,
  Divider,
  Grid,
} from '@material-ui/core';
import {
  Avatar,
  Paper,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import ROUTE from '../../routes/RoutesNames';
import CommentsSection from '../../components/comments-section';
import { getCommentsByUser } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/Auth';
import { apiURL } from '../../utils/constants';

const useStyles = createUseStyles((theme) => ({
  tableContainer: {
    // backgroundColor: theme.color.light,
    borderWidth: 20,
    padding: 5,
  },
  userImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
    borderTopLeftRadius: 0,
  },
  imageContainer: {
    paddingBottom: 10,
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfos: {
    marginLeft: 20,
  },
  button: {
    // backgroundColor: theme.color.light,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    position: 'relative'
  },
  description: {
    // backgroundColor: theme.color.light,
    width: window.innerWidth * 0.609
  }
}));

const UsersDetails = ({ ...rest }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const { push } = useHistory();
  const location = useLocation();
  const { token } = useContext(AuthContext)

  const dispatch = useDispatch();

  const user = useSelector((state) => state.userById);
  const commentsById = useSelector((state) => state.listCommentsByUser);
  const listBooks = useSelector((state) => state.userListBooks);

  useEffect(async () => {
    if(!user.length > 0) {
      await console.log('List', listBooks);
      var list = ""
      listBooks.forEach((book) => {
          list += (book.id + "/");
      });
      list = list.substring(0, list.length - 1);
      dispatch(getCommentsByUser(apiURL + `api/bdd/userListRatings`, token, user.uid, list))
    }
  }, [])

  return (
    <div>
      <Card className={classes.tableContainer}>
        <CardHeader
          title={user.pseudo}
          className={classes.tableContainer}
        />
        <Row className={classes.tableContainer}>
          <Column>
            <Box className={classes.imageContainer} sx={{ minWidth: 1050 }}>
              {!user ?
                <Skeleton height={160} width={160} borderRadius={20} variant="rect" animation="wave" />
                :
                <img
                  src={user.picture}
                  alt={'picture'}
                  className={classes.userImage}
                />
              }
            </Box>
            {user.isBlocked ?
              <Chip label="Bloqué" color="secondary" />
              :
              <Chip label="Autorisé" color="primary" />
            }
          </Column>
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  disabled={true}
                  fullWidth
                  //label="Pseudo"
                  value={user.pseudo}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  disabled={true}
                  fullWidth
                  //label="Mail"
                  value={user.email}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextareaAutosize
                  disabled={true}
                  rowsMin={10}
                  className={classes.description}
                  aria-label="minimum height"
                  placeholder="Bio"
                  value={user.bio}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Row>
        <Box className={classes.button}>
          <Button
            color={user.isBlocked ? "secondary" : "primary"}
            variant="contained"
          >
            {user.isBlocked ? "Débloquer" : "Bloquer"}
          </Button>
        </Box>
      </Card>
      <CommentsSection comments={commentsById} />
    </div>
  );
};

export default UsersDetails;
