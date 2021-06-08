import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Column } from 'simple-flexbox';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Book from'../../../assets/png/book.png';

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


  function goBack() {
    history.goBack();
  }

  return (
    <Column className={classes.containers}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Box className={classes.logo}>
            <img
                src={Book}
                alt='book'
                className={classes.logo}
            />
          </Box>
          <Typography component="h1" variant="h5" color="#373a47">
            BookApp - Mot de passe oublié
          </Typography>
          <form className={classes.form}>
            <TextField
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
              color="#373a47"
              className={classes.submit}
            >
              Envoyer
            </Button>
            <Grid container>
              <Grid container justify='center' direction='row' alignItems="center" item xs>
                <Link onClick={goBack} variant="body2">
                  Se Connecter ?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Column>
  );
}