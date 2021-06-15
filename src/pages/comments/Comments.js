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
    label: "Photo de profil",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => (
        <img
          src={value}
          alt='avatar'
          style={{ width: 80, height: 120 }} />
      )
    },
  },
  {
    name: "book_title",
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

const Comments = ({ ...rest }) => {
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

  const fetchBooks = async () => {
    var array = [];
    const response = dbUsers.collection('ratings').get()
      .then(ratings => {
        const data = ratings.docs.map( (doc) => { 
          dbUsers.collection('ratings').doc(doc.data().id).collection('comments').get()
          .then(comments => {
            const data = comments.docs.map(doc => 
              array.push(doc.data())
            );
            console.log("DATA2", array);
            setUsers(array); // array of cities objects
          });

        });
        console.log('DATA', data);
      });
      
    return response;
  }

  useEffect(() => {
    fetchBooks();
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

export default Comments;
