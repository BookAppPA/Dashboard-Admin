import { useEffect } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useLocation, useHistory } from 'react-router-dom';
import { Skeleton, Rating } from '@material-ui/lab';
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
  Avatar,
  Grid,
  Paper,
} from '@material-ui/core';
import comments from '../../services/mocks/comments';
import { useSelector } from 'react-redux';
import ROUTE from '../../routes/RoutesNames';
import CommentsSection from '../../components/comments-section';


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
  //const user = location.user;
  const user = useSelector((state) => state.userById);

  useEffect(() => {
    if (!location.user) {
      push(ROUTE.USERS);
    }
  }, [location])

  console.log("USER", user)

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
      <div className="App">
        <CommentsSection comments={comments} />
      </div>
    </div>
  );
};

export default UsersDetails;
