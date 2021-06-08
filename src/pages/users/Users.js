import { useState, } from 'react';
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
import ActionsUsers from '../../components/actionsUsers';

const useStyles = createUseStyles((theme) => ({
  tableContainer: {
      minWidth: 1050,
      backgroundColor: theme.color.grayishBlue3,
  },
  tableTitle: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold'
  },
  tableText: {
    fontSize: 16,
    color: '#FFF',
  }
}));


const Users = ({ ...rest }) => {
  const [selectedUsersId, setSelectedUsersId] = useState([]);
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
        <Box className={classes.tableContainer} sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead className={classes.tableTitle}>
              <TableRow>
                <TableCell>
                 Type d'utilisateur
                </TableCell>
                <TableCell>
                  Nom/Prénom
                </TableCell>
                <TableCell>
                  Mail
                </TableCell>
                <TableCell>
                  Téléphone
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map((user) => (
                <TableRow
                  hover
                  key={user.id}
                  selected={selectedUsersId.indexOf(user.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <Typography
                        color={'#FFF'}
                        variant="body1"
                      >
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {`${user.address.city}, ${user.address.state}, ${user.address.country}`}
                  </TableCell>
                  <TableCell>
                    {user.phone}
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
