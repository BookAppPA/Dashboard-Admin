import { useState, useEffect, useContext } from 'react';
import PropTypes, { array } from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import { Box, Card } from '@material-ui/core';
import { dbUsers } from '../../services/firebase';
import MUIDataTable from "mui-datatables";
import { useHistory } from 'react-router-dom';
import ROUTE from '../../routes/RoutesNames';
import Chip from '@material-ui/core/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { apiURL } from '../../utils/constants';
import { getCommentsByBookId, getCommentsByUser, getUserListBooks } from '../../redux/actions';
import { AuthContext } from '../../context/Auth';
import LoadingComponent from '../../components/loading';
import imageNotFound from '../../assets/png/imagenotfound.png';
import { Rating } from '@material-ui/lab';


const useStyles = createUseStyles((theme) => ({
  tableContainer: {
    backgroundColor: theme.color.light,
    padding: 20,
  },
  userImage: {
    width: 60,
    height: 120,
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const columns = [
  {
    name: "book_pic",
    label: "Couverture",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => (
        value ?
          <img
            src={value}
            alt='avatar'
            style={{ width: 80, height: 110 }} />
          :
          <img
            src={imageNotFound}
            alt='avatar'
            style={{ width: 80, height: 110 }} />
      )
    },
  },
  {
    name: "book_title",
    label: "Pseudo",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "note",
    label: "Note",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (
        <Rating value={value ? value : 0} readOnly />
      )
    }
  },
  {
    name: "nbRatings",
    label: "Nombre d'avis",
    options: {
      filter: false,
      sort: false,
    }
  },
];

const Comments = ({ ...rest }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { push } = useHistory();
  const { token } = useContext(AuthContext)

  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.allUsers);
  const comments = useSelector(state => state.listCommentsByBookId);
  const listBooks = useSelector((state) => state.userListBooks);
  const [stateReady, setReadyForRender] = useState(false)

  const redirectTo = (rowData) => {
    push({
      pathname: ROUTE.USERS_DETAILS,
      user: rowData
    });
  }

  const options = {
    filterType: 'checkbox',
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: false,
    selectableRowsOnClick: false,
    onRowClick: redirectTo,
    responsive: 'responsiveSimple'
  };

  const getAllComments = async (allusersId) => {
    //get all books from users 
    await allusersId.map(async (id) => {
      await dispatch(getUserListBooks(apiURL + `book/userListBooks/${id}`, token))
    })

    var listArray = [];
    //filter the array and delete empty rows
    listArray.push(listBooks);
    var newArray = listArray.filter(e => e);

    var books_results = []
    for (const books of newArray) {
      books_results = await books;
    }

    for (const bookId of books_results) {
      await dispatch(getCommentsByBookId(apiURL + `rating/ratingByBook/${bookId.id}`, token));
    }
  }

  useEffect(async () => {
    var allusersId = [];

    //get all ids
    allUsers.map(async (user) => {
      await allusersId.push(user.uid);
    })
    if (comments.length == 0) {
      getAllComments(allusersId);
    }
    setTimeout(() => {
      setReadyForRender(true);
    }, 1000)
    return () => {
      setReadyForRender(false)
    }
  }, [stateReady])

  console.log('Comment', comments);

  return (
    <div>
      {stateReady ?
        <Box className={classes.tableContainer} sx={{ minWidth: 1050 }}>
          <MUIDataTable
            data={comments}
            columns={columns}
            options={options}
          />
        </Box>
        :
        <LoadingComponent />}
    </div>
  );
};

export default Comments;
