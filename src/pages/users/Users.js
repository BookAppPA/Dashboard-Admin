import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import { Box,Card } from '@material-ui/core';
import { dbUsers } from '../../services/firebase';
import MUIDataTable from "mui-datatables";
import { useHistory } from 'react-router-dom';
import ROUTE from '../../routes/RoutesNames';
import Chip from '@material-ui/core/Chip';

const useStyles = createUseStyles((theme) => ({
  tableContainer: {
    backgroundColor: theme.color.light,
    padding:20,
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
        <img
          src={value}
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
  const [users, setUsers] = useState([]);
  const { push } = useHistory();

  const redirectTo = ( rowData ) => {
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
  };

  const fetchUsers = async () => {
    const response = dbUsers.collection('users').get()
      .then(users => {
        const data = users.docs.map(doc => doc.data());
        setUsers(data); // array of cities objects
      });
    return response;
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <Card>
      <Box className={classes.tableContainer} sx={{ minWidth: 1050 }}>
        <MUIDataTable
          data={users}
          columns={columns}
          options={options}
        />
      </Box>
    </Card>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;
