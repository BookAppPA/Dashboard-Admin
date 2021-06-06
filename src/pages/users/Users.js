import { Box, Container } from '@material-ui/core';
import TableUsers from '../../components/table/Table';
import customers from '../../mocks/users';

function Users() {
  return (
    <Box
      sx={{
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <TableUsers users={customers} />
        </Box>
      </Container>
    </Box>
  );
};

export default Users;
