import { useState, useEffect, useContext } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { Box, Card } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { useHistory } from 'react-router-dom';
import ROUTE from '../../../routes/RoutesNames';
import Chip from '@material-ui/core/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getUserById, getUserListBooks } from '../../../redux/actions';
import { AuthContext } from '../../../context/Auth';
import { apiURL } from '../../../utils/constants';
import imageNotFound from '../../../assets/png/imagenotfound.png';

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
    name: "picture",
    label: "Photo de profil",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => (
        value ?
          <img
            src={value}
            alt='avatar'
            style={{ width: 80, height: 80 }} />
          :
          <img
            src={imageNotFound}
            alt='avatar'
            style={{ width: 80, height: 80 }} />
      )
    },
  },
  {
    name: "pseudo",
    label: "Pseudo",
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
    name: "nbRatings",
    label: "Nombre d'avis",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'isBlocked',
    label: "Statut",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (
        <Chip
          label={value ? "Bloqué" : "Autorisé"}
          color={value ? "secondary" : "primary"}
        />
      )
    }
  },
  {
    name: "uid",
    options: {
      display: false
    }
  }
];

const Users = ({ ...rest }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const allUsers = useSelector((state) => state.allUsers);

  const redirectTo = async (rowData) => {

    await dispatch(getUserById(apiURL + `api/bdd/getUserById/${rowData[6]}`, token));
    await dispatch(getUserListBooks(apiURL + `api/bdd/userListBooks/${rowData[6]}`, token));

    push({
      pathname: ROUTE.USERS_DETAILS,
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
    if (allUsers.length == 0) {
      dispatch(getAllUsers(apiURL + 'api/bdd/getAllUsers', token))
    }
  }, [token])

  return (
    <Box className={classes.tableContainer} sx={{ minWidth: 1050 }}>
      <MUIDataTable
        data={allUsers}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default Users;
