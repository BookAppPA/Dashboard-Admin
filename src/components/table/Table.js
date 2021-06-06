import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';

const TableComponent = ({ users, ...rest }) => {
  const [selectedUsersId, setSelectedUsersId] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newselectedUsersId;

    if (event.target.checked) {
      newselectedUsersId = users.map((user) => user.id);
    } else {
      newselectedUsersId = [];
    }

    setSelectedUsersId(newselectedUsersId);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsersId.indexOf(id);
    let newselectedUsersId = [];

    if (selectedIndex === -1) {
      newselectedUsersId = newselectedUsersId.concat(selectedUsersId, id);
    } else if (selectedIndex === 0) {
      newselectedUsersId = newselectedUsersId.concat(selectedUsersId.slice(1));
    } else if (selectedIndex === selectedUsersId.length - 1) {
      newselectedUsersId = newselectedUsersId.concat(selectedUsersId.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedUsersId = newselectedUsersId.concat(
        selectedUsersId.slice(0, selectedIndex),
        selectedUsersId.slice(selectedIndex + 1)
      );
    }

    setSelectedUsersId(newselectedUsersId);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
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
              {users.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedUsersId.indexOf(customer.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                  </TableCell>
                  <TableCell>
                    {customer.phone}
                  </TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      <TablePagination
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

TableComponent.propTypes = {
  users: PropTypes.array.isRequired
};

export default TableComponent;