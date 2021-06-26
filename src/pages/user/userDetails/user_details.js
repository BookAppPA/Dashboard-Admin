import { useContext, useEffect } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useLocation, useHistory } from 'react-router-dom';
import { Column, Row } from 'simple-flexbox';
import {
  Chip,
  TextareaAutosize,
  Button,
  Box,
} from '@material-ui/core';
import CommentsSection from '../../../components/comments-section';
import { getCommentsByUser } from '../../../redux/actions';
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
    borderRadius: 20,
    borderTopLeftRadius: 0,
    marginRight: 20,
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
  chip: {
    width: window.innerWidth * 0.5,
    marginTop: 100,
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
    if (!user.length > 0) {
      await console.log('List', listBooks);
      var list = ""
      listBooks.forEach((book) => {
        list += (book.id + "/");
      });
      list = list.substring(0, list.length - 1);
      dispatch(getCommentsByUser(apiURL + `api/bdd/userListRatings`, token, user.uid, list));
      await getBooksInfos();
    }
  }, [])

  const getBooksInfos = async () => {
    var array = [];
    listBooks.forEach((book) => {
      axios.get(apiURL + `api/bdd/bookDetail/${book.id}`, {
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
          <img
            src={user.picture ? user.picture : ImageNotFound}
            alt={'picture'}
            className={classes.userImage}
          />
          <Column>
            <TextareaAutosize
              disabled={true}
              rowsMin={10}
              className={classes.description}
              aria-label="minimum height"
              placeholder="Bio"
              value={user.bio}
            />
            <div className={classes.chip}>
              {user.isBlocked ?
                <Chip label="Bloqué" color="secondary" />
                :
                <Chip label="Autorisé" color="primary" />
              }
            </div>
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
                <div style={{marginTop: 20, display: 'flex', flexDirection:'column'}}>
                  <BookComponent img={book.volumeInfo.imageLinks.medium} title={book.volumeInfo.title} />
                </div>
              )
          })}
        </Row>
      </Column>
    </div>
  );
};

export default UsersDetails;
