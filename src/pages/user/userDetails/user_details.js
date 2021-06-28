import { useContext, useEffect } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useLocation, useHistory } from 'react-router-dom';
import { Column, Row } from 'simple-flexbox';
import {
  Chip,
  TextareaAutosize,
  Button,
  Box,
  Card,
  CardMedia,
  CardActions
} from '@material-ui/core';
import CommentsSection from '../../../components/comments-section';
import { getCommentsByUser, resetState } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../../context/Auth';
import { apiURL } from '../../../utils/constants';
import axios from 'axios';
import InfosDetails from '../../../components/infosDetails/';
import ImageNotFound from '../../../assets/png/imagenotfound.png';
import BookComponent from '../../../components/bookComponent';

const useStyles = createUseStyles((theme) => ({
  tableContainer: {
    // backgroundColor: theme.color.light,
    borderWidth: 20,
    padding: 5,
  },
  userImage: {
    width: 300,
    height: 300,
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
    position: 'relative'
  },
  description: {
    // backgroundColor: theme.color.light,
    width: window.innerWidth * 0.609,
  },
  backgroundActions: {
    backgroundColor: '#ECECE5',
    justifyContent: 'center'
  }
}));

const UsersDetails = ({ ...rest }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const { push } = useHistory();
  const { token } = useContext(AuthContext)

  const dispatch = useDispatch();

  const user = useSelector((state) => state.userById);
  const commentsById = useSelector((state) => state.listCommentsByUser);
  const listBooks = useSelector((state) => state.userListBooks);
  const list = ""

  useEffect(() => {
    console.log('user', user);
    console.log('commentbyId', commentsById);

    console.log('List', listBooks);
    var list = ""
    listBooks.forEach((book) => {
      list += (book.id + "/");
    });
    list = list.substring(0, list.length - 1);
    console.log('STRING LIST', list);
    console.log('USER ID IN DETAILS', user.uid);
    dispatch(getCommentsByUser(apiURL + `rating/userListRatings`, token, user.uid, list));
    getBooksInfos();
    return () => {
      dispatch(resetState());
    }
  }, [])

  const getBooksInfos = async () => {
    console.log('test book info');
    var array = [];
    listBooks.forEach((book) => {
      axios.get(apiURL + `book/bookDetail/${book.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(async (res) => {
          await array.push(res.data.volumeInfo);
        })
        .catch(error => {
          console.log(error);
        })
    })
  }

  return (
    <div>
      <Column>
        <Row>
          <Card>
            <CardMedia
              className={classes.userImage}
              image={user.picture ? user.picture : ImageNotFound}
            />
            <CardActions className={classes.backgroundActions}>
              <div className={classes.chip}>
                {user.isBlocked ?
                  <Chip label="Bloqué" color="secondary" />
                  :
                  <Chip label="Autorisé" color="primary" />
                }
              </div>
            </CardActions>
          </Card>
          <Column style={{ marginLeft: 15 }}>
            <TextareaAutosize
              disabled={true}
              rowsMin={10}
              className={classes.description}
              aria-label="minimum height"
              placeholder="Bio"
              value={user.bio}
            />
          </Column>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <InfosDetails name='Pseudo' value={user.pseudo} />
          <InfosDetails name='Mail' value={user.email} />
          <InfosDetails name='Followers' value={user.nbFollowers ? user.nbFollowers : 0} />
          <InfosDetails name="Avis" value={user.nbRatings ? user.nbRatings : 0} />
        </Row>
        <Box className={classes.button}>
          <Button
            color={user.isBlocked ? "secondary" : "primary"}
            variant="contained"
          >
            {user.isBlocked ? "Débloquer" : "Bloquer"}
          </Button>
        </Box>
      </Column>
      <CommentsSection comments={commentsById} />
      <Column>
        <h3>Ses derniers livres</h3>
        <Row>
          {listBooks.map((book) => {
            return (
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>
                <BookComponent img={book.volumeInfo.imageLinks.medium ? book.volumeInfo.imageLinks.medium : book.volumeInfo.imageLinks.smallThumbnail} title={book.volumeInfo.title} />
              </div>
            )
          })}
        </Row>
      </Column>
    </div>
  );
};

export default UsersDetails;
