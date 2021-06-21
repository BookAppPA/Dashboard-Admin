import { useState, useContext, useEffect} from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { Box, Card} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookSellers } from '../../../redux/actions';
import { AuthContext } from '../../../context/Auth';
import { apiURL } from '../../../utils/constants';
import MUIDataTable from "mui-datatables";
import { useHistory } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import ROUTE from '../../../routes/RoutesNames';


const useStyles = createUseStyles((theme) => ({
  tableContainer: {
    backgroundColor: theme.color.light,
    padding: 20,
  },
  userImage: {
    width: 80,
    height: 80,
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const columns = [
  {
    name: "name",
    label: "Nom",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "email",
    label: "Mail",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "bio",
    label: "Bio",
    options: {
      filter: false,
      sort: false,
    }
  },
  {
    name: "phone",
    label: "Numéro de téléphone",
    options: {
      filter: true,
      sort: true,
    }
  },
];

const Bookstores = ({ ...rest }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const allBookSellers = useSelector((state) => state.allBookSellers);

  const redirectTo = async (rowData) => {

    // await dispatch(getUserById(apiURL + `api/bdd/getUserById/${rowData[6]}`, token));
    // await dispatch(getUserListBooks(apiURL + `api/bdd/userListBooks/${rowData[6]}`, token));

    push({
      pathname: ROUTE.BOOKSELLER_DETAIL,
      userID: rowData[6]
    });
  }

  const options = {
    filterType: 'checkbox',
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: false,
    selectableRowsOnClick: false,
    onRowClick: redirectTo,
  };

  useEffect(() => {
    if (allBookSellers.length == 0) {
      dispatch(getAllBookSellers(apiURL + '/api/bdd/getAllBookSellers', token))
    }
  }, [token])

  return (
    <Card>
      <Box className={classes.tableContainer} sx={{ minWidth: 1050 }}>
        <MUIDataTable
          data={allBookSellers}
          columns={columns}
          options={options}
        />
      </Box>
    </Card>
  );
};

export default Bookstores;
