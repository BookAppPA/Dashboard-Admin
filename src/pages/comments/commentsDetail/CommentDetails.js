import { useContext, useEffect } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useLocation, useHistory } from 'react-router-dom';
import { Column, Row } from 'simple-flexbox';
import CommentsSection from '../../../components/comments-section';
import { deleteCommentById, getOneBookComment } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../../context/Auth';
import { apiURL } from '../../../utils/constants';
import { Box } from '@material-ui/core';
import RoutesNames from '../../../routes/RoutesNames';

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

const CommentsDetail = ({ ...rest }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const dispatch = useDispatch();
  const { push, length, replace } = useHistory();
  const { token } = useContext(AuthContext)
  const { bookId } = useLocation();
  const oneBookComment = useSelector((state) => state.oneBookComments);

  useEffect(() => {
    if(bookId != undefined){
      setTimeout(async ()=> {
        await dispatch(getOneBookComment(apiURL + `rating/ratingByBook/${bookId}`, token ));
      }, 100)
    } else {
      replace(RoutesNames.DASHBOARD_OVERVIEW);
    }
  }, [length])

  return( 
      <div>
        {bookId &&
        <Row>
          <CommentsSection listComments={true} comments={oneBookComment.ratings} />
        </Row>
      }
      </div>
  )
};

export default CommentsDetail;