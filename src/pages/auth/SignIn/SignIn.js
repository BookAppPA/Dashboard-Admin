import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Column, Row } from 'simple-flexbox';
import ROUTE from '../../../routes/RoutesNames';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../../context/Auth";
import { signIn } from '../../../services/firebase';
import AppLogo from'../../../assets/png/BookApp_logo.png';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  containers: {
    minHeight: 950,
    background: '#ECECE5',
    justifyContent:'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
  },
  logo: {
    justifyContent:'center',
    alignItems:'center',
    width: 250,
    height: 250
  } 
}));

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const { currentUser } = useContext(AuthContext);

  const classes = useStyles();
  const { push } = useHistory();

  function forgotPassword() {
    push(ROUTE.FORGOT_PASSWORD)
}

function goToCGU() {
  push(ROUTE.CGU)
}

function logIn() {
  signIn(email, pwd, push, ROUTE.DASHBOARD_OVERVIEW);
}

  return (
    <Column className={classes.containers}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Box className={classes.logo}>
            <img
                src={AppLogo}
                alt='book'
                className={classes.logo}
            />
          </Box>
          <Typography component="h1" variant="h5">
            BookApp
          </Typography>
          <form className={classes.form} onSubmit={logIn}>
            <TextField
              value={email}
              onChange={(email) => setEmail(email.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse Mail"
              name="Mail"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={pwd}
              onChange={(pwd) => setPwd(pwd.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de Passe"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid container justify='center' direction='row' alignItems="center" item xs>
                <Row>
                  <Link onClick={forgotPassword} variant="body2">
                    Mot de passe oublié ?
                  </Link>
                  <Link style={{marginLeft:8}} onClick={goToCGU} variant="body2">
                    Conditions d'utilisation
                  </Link>
                </Row>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Column>
  );
}