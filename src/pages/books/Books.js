import { useState } from 'react';
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
import books from '../../mocks/books';
import { useHistory } from 'react-router-dom';
import ActionsUsers from '../../components/actionsUsers';
import ROUTE from '../../routes/RoutesNames';

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

const Books = ({ ...rest }) => {
  const [selectedBookId, setSelectedBookId] = useState([]);
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const { push } = useHistory();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function editBooks(book){
    push({
      pathname: ROUTE.EDIT_BOOK,
      book: book
    });
  };

  return (
    <Card {...rest}>
        <Box className={classes.tableContainer} sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead className={classes.tableTitle}>
              <TableRow>
                <TableCell>
                 Titre
                </TableCell>
                <TableCell>
                  Auteur
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.slice(0, limit).map((book) => (
                <TableRow
                  hover
                  key={book.id}
                  selected={selectedBookId.indexOf(book.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {book.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {book.authors}
                  </TableCell>
                  <TableCell>
                    <ActionsUsers onClickEdit={() => editBooks(book)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      <TablePagination
        className={classes.tableContainer}
        component="div"
        count={books.length}
        onPageChange={handlePageChange}
        labelDisplayedRows={()=>null}
        page={page}
        labelRowsPerPage={''}
        rowsPerPageOptions={[]}
      />
    </Card>
  );
};

export default Books;
