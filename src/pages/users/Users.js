import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import users from '../../mocks/users';
import { dbUsers } from '../../services/firebase';
import ActionsUsers from '../../components/actionsUsers';

const useStyles = createUseStyles((theme) => ({
  tableContainer: {
    backgroundColor: theme.color.grayishBlue3,
  },
  userImage: {
    width:80,
    height: 80,
  },
  body: {
    display:'flex',
    justifyContent:'center',
    alignItems: 'center',
  }
}));


const Users = ({ ...rest }) => {
  const [selectedUsersId, setSelectedUsersId] = useState([]);
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [users,setUsers]=useState([])

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const fetchUsers = async () => {
    const response = dbUsers.collection('users').get()
    .then(users => {
      const data = users.docs.map(doc => doc.data());
      setUsers(data); // array of cities objects
    });
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <Card {...rest}>
        <Box className={classes.tableContainer} sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                 Photo de profil
                </TableCell>
                <TableCell>
                  Pseudo
                </TableCell>
                <TableCell>
                  Mail
                </TableCell>
                <TableCell>
                   Bio
                </TableCell>
                <TableCell>
                  Nombre d'avis
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map((user) => (
                <TableRow
                  hover
                  key={user.uid}
                  selected={selectedUsersId.indexOf(user.uid) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <img 
                        src={user.picture}
                        alt='avatar'
                        className={classes.userImage}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.pseudo}
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.bio}
                  </TableCell>
                  <TableCell>
                    {user.nbRatings}
                  </TableCell>
                  <TableCell>
                    <ActionsUsers user={true}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      <TablePagination
        className={classes.tableContainer}
        component="div"
        count={users.length}
        onPageChange={handlePageChange}
        labelDisplayedRows={()=>null}
        page={page}
        labelRowsPerPage={''}
        rowsPerPageOptions={[]}
      />
    </Card>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;
