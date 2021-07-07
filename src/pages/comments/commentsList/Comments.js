import { useState, useEffect, useContext } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { Box } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { useHistory } from 'react-router-dom';
import ROUTE from '../../../routes/RoutesNames';
import { useDispatch, useSelector } from 'react-redux';
import { apiURL } from '../../../utils/constants';
import { getAllBooksInApp, getCommentsByBookId, getOneBookComment } from '../../../redux/actions';
import { AuthContext } from '../../../context/Auth';
import LoadingComponent from '../../../components/loading';
import imageNotFound from '../../../assets/png/imagenotfound.png';
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
    name: "id",
    label: "id",
    options: {
      display: false,
    }
  },
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
    label: "Titre du livre",
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
      filter: true,
      sort: true,
    }
  },
];

const Comments = ({ ...rest }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { push } = useHistory();
  const { token } = useContext(AuthContext)

  const dispatch = useDispatch();
  const comments = useSelector(state => state.listCommentsByBookId);
  const [stateReady, setReadyForRender] = useState(false);
  const allBooksInApp = useSelector(state => state.allBooksInApp);

  const redirectTo = (rowData) => {
    dispatch(getOneBookComment(apiURL + `rating/ratingByBook/${rowData[0]}`, token));
    push({
      pathname: ROUTE.COMMENTS_DETAILS,
      bookId: rowData[0],
    });
  }

  const options = {
    filterType: 'checkbox',
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
    selectableRowsOnClick: false,
    onRowClick: redirectTo,
    responsive: 'responsiveSimple',
    print: false,
  };

  const getAllComments = async () => {
    await dispatch(getAllBooksInApp(apiURL + 'book/getAllBooks'));
    for (var bookId in allBooksInApp) {
      dispatch(getCommentsByBookId(apiURL + `rating/ratingByBook/${allBooksInApp[bookId]}`, token));
    }

  }

  useEffect(async () => {
    if (comments.length == 0) {
      getAllComments();
    }
    setTimeout(() => {
      setReadyForRender(true);
    }, 1000)
  }, [stateReady])

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
