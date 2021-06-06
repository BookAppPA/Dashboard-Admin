import React, { useState, useRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Column } from 'simple-flexbox';
import ROUTE from '../../../routes/RoutesNames';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../../context/Auth";
import firebaseConfig from "../../../services/firebase";


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
}));

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useContext(AuthContext);

  const classes = useStyles();
  const { push } = useHistory();

  function forgotPassword() {
    console.log("Test forgot");
    push(ROUTE.FORGOT_PASSWORD)
}

function logIn() {
    try {
      firebaseConfig.auth().signInWithEmailAndPassword(email, pwd);
      console.log(firebaseConfig)
      console.log('Current', currentUser)
      console.log('test login');
      push(ROUTE.DASHBOARD_OVERVIEW);
    } catch (error) {
      alert(error);
    }
  push(ROUTE.DASHBOARD_OVERVIEW);
}

  return (
    <Column className={classes.containers}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" color="#373a47">
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
            <FormControlLabel
              control={<Checkbox value="remember" color="#373a47" />}
              label="Se souvenir"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="#373a47"
              className={classes.submit}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid container justify='center' direction='row' alignItems="center" item xs>
                <Link onClick={forgotPassword} variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Column>
  );
}