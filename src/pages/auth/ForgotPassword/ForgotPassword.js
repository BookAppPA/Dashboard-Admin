import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Column, Row } from 'simple-flexbox';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import AppLogo from'../../../assets/png/BookApp_logo.png';
import { forgotPassword } from '../../../services/firebase';
import { useState } from 'react';
import ROUTE from '../../../routes/RoutesNames';

const useStyles = makeStyles((theme) => ({
  containers: {
    minHeight: 950,
    background: '#ECECE5',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    justifyContent:'center',
    alignItems:'center',
    width: 250,
    height: 250
  } 
}));

export default function ForgotPassword() {

  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');


  function goBack() {
    history.goBack();
  };

  function goToCGU() {
    history.push(ROUTE.CGU)
  }

  function sendNewPwd() {
    forgotPassword(email);
  };

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
            BookApp - Mot de passe oublié
          </Typography>
          <form className={classes.form} onSubmit={()=>sendNewPwd}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Envoyer
            </Button>
            <Grid container>
              <Grid container justify='center' direction='row' alignItems="center" item xs>
                <Row>
                  <Link onClick={goBack} variant="body2">
                    Se Connecter ?
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