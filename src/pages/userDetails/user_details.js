import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import { Box, Card } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import ROUTE from '../../routes/RoutesNames';
import Skeleton from '@material-ui/lab/Skeleton';
import { Column, Row } from 'simple-flexbox';
import {
  CardContent,
  CardHeader,
  Divider,
  Chip, 
  TextField,
  Grid,
  TextareaAutosize,
  Button
} from '@material-ui/core';

const useStyles = createUseStyles((theme) => ({
  tableContainer: {
    // backgroundColor: theme.color.light,
    borderWidth: 20,
    padding: 5,
  },
  userImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
    borderTopLeftRadius: 0,
  },
  imageContainer: {
    paddingBottom: 10,
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfos: {
    marginLeft: 20,
  },
  button: {
    // backgroundColor: theme.color.light,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    position: 'relative'
  },
  description: {
    // backgroundColor: theme.color.light,
    width: window.innerWidth*0.609
  }
}));

const UsersDetails = ({ ...rest }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [users, setUsers] = useState({});
  const { push } = useHistory();
  const location = useLocation();
  const user = location.user;

  const mapArrayUsers = async (user) => {
    var obj = {};
    var array = []
    await user.map((item, index) => {
      if (item.type != undefined) {
        array.push(item.props.src)
      } else {
        array.push(item)
      }
    })
    obj = {
      picture: array[0],
      pseudo: array[1],
      mail: array[2],
      bio: array[3],
      isBlocked: array[4],
      uid: array[5]
    }
    setUsers(obj);
    return obj;
  };

  useEffect(() => {
    if (user) {
      mapArrayUsers(user);
    } else {
      push(ROUTE.USERS);
    }
  }, [location])

  console.log("USER", users)

  return (
    <Card className={classes.tableContainer}>
      <CardHeader
        title={users.pseudo}
        className={classes.tableContainer}
      />
      <Row className={classes.tableContainer}>
        <Column>       
          <Box className={classes.imageContainer} sx={{ minWidth: 1050 }}>
            {!users ?
              <Skeleton height={160} width={160} borderRadius={20} variant="rect" animation="wave" />
              :
              <img
                src={users.picture}
                alt={'picture'}
                className={classes.userImage}
              />
            }
          </Box>
          { users.isBlocked ?
              <Chip label="Bloqué" color="secondary"/>
            :
              <Chip label="Autorisé" color="primary" />
          }
        </Column> 
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                disabled={true}
                fullWidth
                label="Pseudo"
                value={users.pseudo}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                disabled={true}
                fullWidth
                label="Mail"
                value={users.mail}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextareaAutosize
                rowsMin={10}
                className={classes.description}
                aria-label="minimum height"
                placeholder="Bio"
                value={users.bio}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Row>
      <Box className={classes.button}>
        <Button
          color={users.isBlocked ? "secondary" : "primary"}
          variant="contained"
        >
          {users.isBlocked ? "Débloquer" : "Bloquer"}
          </Button>
      </Box>
    </Card>
  );
};

UsersDetails.propTypes = {
  users: PropTypes.array.isRequired
};

export default UsersDetails;
